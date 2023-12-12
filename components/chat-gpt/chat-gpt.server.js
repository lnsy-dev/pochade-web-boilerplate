const dotenv = require("dotenv")
dotenv.config()

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,

});

const queryChatGPT = async (prompt) => {
  const completion = await openai.chat.completions.create({
    messages: prompt,
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message;
};

module.exports = {
  queryChatGPT
}