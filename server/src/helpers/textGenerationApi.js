// muttyAssistant.js
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * Merge two dog-profile objects into a blended-breed profile by letting
 * Gemini generate the JSON (blend + description).
 *
 * @param {Object} dogOne  – first dog JSON
 * @param {Object} dogTwo  – second dog JSON
 * @returns {Promise<{ jsonObject: Object }>}
 */
async function muttyAssistant(dogOne, dogTwo) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY missing from environment");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  // Gemini structured-output: force raw JSON
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-latest",
    generationConfig: {
      temperature: 0.35,                       
      response_mime_type: "application/json"   
    }
  });

  /* ---------- prompt ---------- */
  const prompt = `
You are DogMixGPT. Blend the two dog profiles below.

• Average every numeric property that appears in both.
  (If only one dog has a key, copy that value.)
• Create a hybrid name by combining the names of each source
  name (e.g. "Pug" + "Husky" → "Pusky") making sure it is not more than 10 letters long and only the first letter is capitalized.
• Output exactly ONE JSON object in the shape:
  { "data": { "blend": {…stats…,"name":"<hybrid>" }, "description":"…" } }
• The description (90-140 words) must reflect the blended stats, but don't mention the stats in the description.
• No extra keys, no markdown – pure JSON only.

Dog A:
${JSON.stringify(dogOne)}

Dog B:
${JSON.stringify(dogTwo)}
`.trim();

  /* ---------- call Gemini ---------- */
  const response = await model.generateContent(prompt);
  const jsonText = await response.response.text();

  // Parse to be sure we return a real object
  const jsonObject = JSON.parse(jsonText);

  return { jsonObject };
}

module.exports = muttyAssistant;
