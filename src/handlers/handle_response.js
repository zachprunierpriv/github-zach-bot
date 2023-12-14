const OpenAiApi = require('../services/openapi_service');
const GroupmeApi = require('../services/groupme_api_service')

class ResponseHandler {

    constructor () {
        this.openAiService = new OpenAiApi();
        this.groupmeService = new GroupmeApi();
    }

    async handleResponse (message, user) {
        console.log(`Recieved message: ${message} from user ${user}`)

        if(checkForDeletedMessage(message)) {
            return null;
        }
        if(message.toLowerCase().includes('hey crow daddy, ')) {
            console.log(`Request to Crow Daddy made, calling openAI`);
            let string = message.toLowerCase().replace('hey crow daddy, ', '');
            let response = await this.openAiService.generateResponse(string);
            
            if(response) {
                console.log(`response: ${JSON.stringify(response)}`);
                this.groupmeService.sendMessage(response.choices[0].message.content, user);
            }

            return true;
        }

        return null;
    }

    
}

function checkForDeletedMessage(message) {
        return message === 'A message was deleted.';
}

module.exports = ResponseHandler;
