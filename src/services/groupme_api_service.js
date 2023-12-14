const axios = require('axios');

const groupmeBaseUrl = "https://api.groupme.com";
const postEndpoint = "/v3/bots/post";

class GroupmeApi {
    constructor() {
        this.axiosReqObject = {
            method: 'post',
            url: postEndpoint,
            headers: {
                'X-Access-Token': process.env.GROUPME_API_KEY
            },
            data: {}
        };
        this.api = axios.create({baseURL: groupmeBaseUrl})
    }

    async sendMessage(text, user) {
        this.axiosReqObject.data = {"text" : `@${user} ${text}`, "bot_id" : "04f99dc63c3726526ed27a1d9e"}
        try {
            this.api(this.axiosReqObject);
            return true;
        } catch (e) {
            console.log(`Error making request to groupme ${e.message}`);
        }
    }
}
module.exports = GroupmeApi
