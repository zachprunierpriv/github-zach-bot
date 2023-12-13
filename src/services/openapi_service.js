const openai = require('openai')

const client = new openai.OpenAI();
const defaultObject = {
    messages: [{
        role: "system",
        content: "Give me a snarky response to the following message: "
    }],
    "model": "gpt-3.5-turbo"
}
let key = '';
client.apiKey = key;

async function generateResponse(message) {
    let object = {...defaultObject};
    object.messages[0].content = object.messages[0].content + message;

    return await client.chat.completions.create(object);
}

module.exports == generateResponse;