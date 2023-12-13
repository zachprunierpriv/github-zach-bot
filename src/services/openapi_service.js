const openai = require('openai')

const client = new openai.OpenAI({key: process.env.OPENAI_API_KEY});

const defaultObject = {
    messages: [{role: 'user', content: 'give me a snarky response for the following message: ' }],
    model: 'gpt-4'
}

async function generateResponse(message) {
    let object = {...defaultObject};
    object.messages[0].content = object.messages[0].content + message;

    return await client.chat.completions.create(object);
}

module.exports.generateAiResponse = generateResponse
