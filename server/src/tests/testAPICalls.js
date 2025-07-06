require('dotenv').config();
const fs = require('fs');
const path = require('path');
const replicateSubmit = require('../helpers/imageGenerationApi');
const muttyAssistant = require('../helpers/textGenerationApi');

const greyhound = {
  "good_with_children": 3,
  "good_with_other_dogs": 4,
  "shedding": 2,
  "grooming": 1,
  "drooling": 0,
  "coat_length": 1,
  "good_with_strangers": 3,
  "playfulness": 3,
  "protectiveness": 1,
  "trainability": 4,
  "energy": 5,
  "barking": 2,
  "max_height_male": 30,
  "max_height_female": 28,
  "max_weight_male": 70,
  "max_weight_female": 65,
  "min_height_male": 27,
  "min_height_female": 25,
  "min_weight_male": 60,
  "min_weight_female": 55,
  "name": "Greyhound"
};

const englishBulldog = {
  "good_with_children": 4,
  "good_with_other_dogs": 3,
  "shedding": 3,
  "grooming": 2,
  "drooling": 5,
  "coat_length": 1,
  "good_with_strangers": 2,
  "playfulness": 2,
  "protectiveness": 3,
  "trainability": 2,
  "energy": 2,
  "barking": 1,
  "max_height_male": 16,
  "max_height_female": 15,
  "max_weight_male": 55,
  "max_weight_female": 50,
  "min_height_male": 14,
  "min_height_female": 14,
  "min_weight_male": 45,
  "min_weight_female": 40,
  "name": "English Bulldog"
};

(async () => {
  if (!process.env.REPLICATE_API || !process.env.GEMINI_API_KEY) {
    console.error("❌ Missing API keys in .env");
    process.exit(1);
  }

  try {
    console.log("🧠 Generating mutt profile via Gemini...");
    const { jsonObject } = await muttyAssistant(greyhound, englishBulldog);
    console.log("✅ Mutt Profile:\n", JSON.stringify(jsonObject, null, 2));

    const hybridName = jsonObject.data.blend.name;
    console.log(`🖼 Generating image for: ${hybridName}...`);

    const result = await replicateSubmit(greyhound.name, englishBulldog.name);
    console.log("✅ Image generation success:", result);

  } catch (err) {
    console.error("❌ Error during test:", err);
    if (err.response?.data) {
      console.error("API Error Details:", err.response.data);
    }
  }
})();
