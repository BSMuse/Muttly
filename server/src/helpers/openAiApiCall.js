
require('dotenv').config();

const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, 
  headers: {
    "OpenAI-API-Version": "v2",
  }
 });



async function muttyAssistent(dogOne, dogTwo) {
  
  const assistant = { id: "asst_eyNsEwUneMnImXNu5Niy976C" };
  
  const dogString = JSON.stringify(dogOne) + JSON.stringify(dogTwo);

  const thread = await openai.beta.threads.create();
  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: dogString,
  });

  const threadId = thread.id

  const interval = 1000;

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
  });

  const messages = await openai.beta.threads.messages.list(thread.id);

  let timeout = 30000;
  let timeElapsed = 0;
  let jsonObject;

  while (timeElapsed < timeout) {
    let retrievedRun = await openai.beta.threads.runs.retrieve(thread.id, run?.id);

    if (retrievedRun && retrievedRun.status === "completed") {
      const messagesFromThread = await openai.beta.threads.messages.list(thread.id);

      const jsonStringWithText = messagesFromThread.data[0].content[0].text.value;

      const jsonMatch = jsonStringWithText.match(/\{.*\}/s);
      const jsonString = jsonMatch ? jsonMatch[0] : '';

      const description = jsonStringWithText.replace(jsonString, '').trim();

    try {
      jsonObject = JSON.parse(jsonString);

      jsonObject.description = description;

    } catch (error) {
      console.error('Error parsing JSON:', error);
    }

      return {jsonObject, threadId};
  }

    await new Promise((resolve) => setTimeout(resolve, interval));
    timeElapsed += interval;
}
 
}





module.exports = muttyAssistent;