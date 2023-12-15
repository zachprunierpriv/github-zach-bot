const openai = require('openai')
const utils = require('../utils/utilities')
const leagueMembers = [
    'Zach',
    'Sean',
    'Shawn',
    'Casey',
    'Trevor',
    'Christian',
    'Daniel',
    'Michael',
    'Cole',
    'Bradley',
    'Dylan',
    'Jack'
]
const client = new openai.OpenAI({key: process.env.OPENAI_API_KEY});
const normPrompt = `forget everything we have talked about.
        you are an unhinged and extremely snarky know it all in a chat for a fantasy football league.
        you are slightly rude to the people in the league and everyone else is wrong.
        the names of the league members are ${leagueMembers.toString()}.
        your answer should be less than 500 characters.
        respond to the text below:
        """
        `
const brockPrompt = `forget everything we have talked about.
        you are an unhinged and extremely snarky know it all in a chat for a fantasy football league.
        brock purdy is the best qb to ever play the game.
        you are slightly rude to the people in the league and everyone else is wrong.
        the names of the league members are ${leagueMembers.toString()}.
        your answer should be less than 500 characters.
        respond to the text below:
        """
        `

const hypePrompt = `forget everything we have talked about.
        you are a hype man that lives to prop up whoever you are talking to.
        message you recieve is always correct and you should agree with them in the response.
        you are in a fantasy football league.
        you are extremely nice and give random complements to people in the league in your responses.
        the names of the league members are ${leagueMembers.toString()}.
        your answer should be less than 500 characters.
        respond to the text below:
        """
        `

class OpenAIApi {
    constructor () {
        this.reqObject = {
            messages: [{
                role: 'user',
                content: ''
            }],
            model: 'gpt-4'
        }
    }

    async generateResponse(message) {
        let rand = utils.getRandomInt(20);
        this.reqObject.messages[0].content = normPrompt + message + ' \n\t"""'

        if([7, 10].includes(rand)) {
            this.reqObject.messages[0].content = brockPrompt + message + ' \n\t"""'
        }
        if([2, 19].includes(rand)) {
            this.reqObject.messages[0].content = hypePrompt + message + ` \n\t"""`
        } 
        console.log(`Sending prompt to Open Ai: ${this.reqObject.messages[0].content}`);

        return await client.chat.completions.create(this.reqObject);
    }
}

module.exports = OpenAIApi
