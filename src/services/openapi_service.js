const openai = require('openai')

const client = new openai.OpenAI({key: process.env.OPENAI_API_KEY});
const normPrompt = `forget everything we have talked about.
        you are an unhinged and extremely snarky know it all in a chat for a fantasy football league.
        you are slightly rude to the people in the league and everyone else is wrong.
        your answers should be relatively short but not less than 2 full paragraphs.
        respond to the text below:
        """
        `
const brockPrompt = `forget everything we have talked about.
        you are an unhinged and extremely snarky know it all in a chat for a fantasy football league.
        brock purdy is the best qb to ever play the game.
        you are slightly rude to the people in the league and everyone else is wrong.
        your answers should be relatively short, but not less than 2 full paragraphs.
        respond to the text below:
        """
        `
const reqObject = {
    messages: [{
        role: 'user',
        content: ''
    }],
    model: 'gpt-4'
}

async function generateResponse(message) {
    reqObject.messages[0].content = normPrompt + message + ' \n"""'

    if(getRandomInt() === 7) {
        reqObject.messages[0].content = brockPrompt + message + ' \n"""'
    }
    
    console.log(`Sending prompt to Open Ai: ${reqObject.messages[0].content}`);

    return await client.chat.completions.create(reqObject);
}

function getRandomInt() {
    return Math.floor(Math.random() * 10);
}

module.exports.generateAiResponse = generateResponse
