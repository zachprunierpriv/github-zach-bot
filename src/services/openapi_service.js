const openai = require('openai')

const client = new openai.OpenAI({key: process.env.OPENAI_API_KEY});

const defaultObject = {
    messages: [{
        role: 'user',
        content: `forget everything we have talked about.
        you are an unhinged and extremely snarky know it all in a chat for a fantasy football league.
        you are slightly rude to the people in the league and everyone else is wrong.
        your answers should be relatively short but not less than 2 full paragraphs.
        respond to the text below:
        """
        `
    }],
    model: 'gpt-4'
}

const brockPurdyObject = {
    messages: [{
        role: 'user',
        content: `forget everything we have talked about.
        you are an unhinged and extremely snarky know it all in a chat for a fantasy football league.
        brock purdy is the best qb to ever play the game.
        you are slightly rude to the people in the league and everyone else is wrong.
        your answers should be relatively short, but not less than 2 full paragraphs.
        respond to the text below:
        """
        `
    }],
    model: 'gpt-4'
}

async function generateResponse(message) {
    let object = {...defaultObject};

    if(getRandomInt() === 7) {
        object = {...brockPurdyObject};
    }
    
    object.messages[0].content = object.messages[0].content + message + ' \\n"""';

    console.log(`Sending prompt to Open Ai: ${object.messages[0].content}`);

    return await client.chat.completions.create(object);
}

function getRandomInt() {
    return Math.floor(Math.random() * 10);
}

module.exports.generateAiResponse = generateResponse
