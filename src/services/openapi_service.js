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
const carrPrompt = `forget everything we have talked about.
        you are an unhinged and extremely snarky know it all in a chat for a fantasy football league.
        you believe that derek carr is the worst qb to play the game and is at best extremely middle of the pack.
        you should mention something about derek carr in your response.
        you are rude to the people in the league and everyone else is wrong.
        the names of the league members are ${leagueMembers.toString()}.
        your answer should be less than 500 characters.
        respond to the text below:
        """
        `

const hypePrompt = `forget everything we have talked about.
        you are a hype man that lives to prop up whoever you are talking to.
        the message you recieve is always correct and you should agree with the premise in the response.
        you are in a fantasy football league.
        you are extremely nice and give random complements to people in the league in your responses.
        you should be so nice that its almost patronizing.
        people should think its weird how nice you are, like a sycophant.
        the names of the league members are ${leagueMembers.toString()}.
        your answer should be less than 500 characters.
        respond to the text below:
        """
        `

const shaqaroni = `give me a plug for the Shaq-a-Roni pizza, created to feed big appetites and make a big impact.
                the pieces are Shaq sized and have over 60 pepperoni from edge to edge. the slogan "pizza gets bigger when you Shaq-a-Roni"
                should be used somewhere in the plug. you should also mention some of shaq's stats. the plug should be less than 500 characters.
                it should be in the style of a corny overhyped tv commercial script. you should be really excited about the Shaq-a-Roni. Please don't use emojis`

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
        let rand = utils.getRandomInt(25);
        this.reqObject.messages[0].content = normPrompt + message + ' \n\t"""'

        if([7, 10].includes(rand)) {
            this.reqObject.messages[0].content = brockPrompt + message + ' \n\t"""'
        }
        if([3, 19].includes(rand)) {
            this.reqObject.messages[0].content = carrPrompt + message + ` \n\t"""`;
        }
        if([2, 4].includes(rand)) {
            this.reqObject.messages[0].content = hypePrompt + message + ` \n\t"""`
        } 
        console.log(`Sending prompt to Open Ai: ${this.reqObject.messages[0].content}`);

        return await client.chat.completions.create(this.reqObject);
    }

    async shaqPlug() {
        this.reqObject.messages[0].content = shaqaroni;

        console.log(`Sending shaqaroni prompt to Open AI:`);

        return await client.chat.completions.create(this.reqObject);
    }
}

module.exports = OpenAIApi
