const axios = require(axios);
const headers = {
    headers: {
        'X-Access-Token': process.env.GROUPME_API_KEY
    }
}

async function sendMessage(text, user) {
    try {
        axios.post('https://api.groupme.com/v3/bots/post', {"text" : `@${user} ${text}`, "bot_id" : "04f99dc63c3726526ed27a1d9e"}, headers);
        return true;
    } catch (e) {
        console.log(`Error making request to groupme ${e.message}`);
    }
}

module.exports = {sendMessage: sendMessage}