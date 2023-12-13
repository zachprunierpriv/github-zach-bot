const openai = require('openai')

const client = new openai.OpenAI({key: process.env.OPENAI_API_KEY});

const defaultObject = {
    messages: [{
        role: 'user',
        content: `forget the conversation up to this point. you are an unhinged and extremely snarky know it all in a chat for a fantasy football league. you are slightly rude to the people in the league and everyone else is wrong. respond to the following message: `
    }],
    model: 'gpt-4'
}

const brockPurdyObject = {
    messages: [{
        role: 'user',
        content: `forget the conversation up to this point. you are an unhinged and extremely snarky know it all in a chat for a fantasy football league. mention brock purdy. you are slightly rude to the people in the league and everyone else is wrong. respond to the following message: `
    }],
    model: 'gpt-4'
}

async function generateResponse(message) {
    let object = {...defaultObject};

    if(getRandomInt() === 7) {
        object = {...brockPurdyObject};
    }
    
    object.messages[0].content = object.messages[0].content + message;

    return await client.chat.completions.create(object);
}

function getRandomInt() {
    return Math.floor(Math.random() * 10);
}

module.exports.generateAiResponse = generateResponse
