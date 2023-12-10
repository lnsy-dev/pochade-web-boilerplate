/*

  chatGpt Server Code

  endpoint is available at /chat-gpt 

*/
const dotenv = require("dotenv")
dotenv.config()

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,

});

const queryChatGPT = async (prompt) => {
  console.log('Looking for prompt', prompt);
  const completion = await openai.chat.completions.create({
    messages: prompt,
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0].message);

  return completion.choices[0].message;

};




// Importing metadata from a JSON file (assuming metadata.json is in the same directory as this script)
const metadata = require('./metadata.json');

// Defining an async function with a placeholder name (chatGpt)
async function chatGpt() {
  // This function simply returns the metadata, but it could be more complex in a real application.
  return metadata;
}

// Exporting a function that takes an Express.js app as a parameter
module.exports = function (app) {
  // Setting up a route handler for POST requests on a dynamic endpoint (chat-gpt)
  app.post('/chat-gpt', async function (req, res) {
    // Extracting the request data from the request body
    const prompt = req.body;
    console.log(prompt);

    const chatResult = await queryChatGPT(prompt);
    res.json(chatResult);

  });
};