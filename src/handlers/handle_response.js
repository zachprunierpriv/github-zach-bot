const OpenAiApi = require('../services/openapi_service');
const GroupmeApi = require('../services/groupme_api_service');
const utilities = require('../utils/utilities');

class ResponseHandler {

    constructor () {
        this.openAiService = new OpenAiApi();
        this.groupmeService = new GroupmeApi();
    }

    async handleResponse (message, user) {
        console.log(`Recieved message: ${message} from user ${user}`)

        if(checkForDeletedMessage(message) || message === '') {
            return null;
        }
        let rand = utilities.getRandomInt(250);
        if(message.toLowerCase().includes('hey crow daddy, ')) {
            console.log(`Request to Crow Daddy made, calling openAI`);
            let string = message.toLowerCase().replace('hey crow daddy, ', '');
            let response = await this.openAiService.generateResponse(string);
            
            if(response) {
                console.log(`response: ${JSON.stringify(response)}`);
                this.groupmeService.sendMessage(response.choices[0].message.content, user);
            }

            return true;
        } else if([73, 120, 250, 200, 1].includes(rand)) {
            console.log(`Sending out a stray`);
            let response = await this.openAiService.generateResponse(message);
            
            if(response) {
                console.log(`stray response: ${JSON.stringify(response)}`);
                this.groupmeService.sendMessage(response.choices[0].message.content, user);
            }
            
            return true;
        } else if(utilities.getRandomInt(250) === rand) {
            console.log('SHAQARONI!!!!!');
            let response = await this.openAiService.shaqPlug();

            if(response) {
                console.log(`Shaqaroni response: ${JSON.stringify(response)}`);
                this.groupmeService.sendMessage(response.choices[0].message.content, user);
            }
        }

        return null;
    }

    
}

function checkForDeletedMessage(message) {
        return message === 'A message was deleted.';
}

module.exports = ResponseHandler;
