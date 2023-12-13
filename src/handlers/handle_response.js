const { triggerAsyncId } = require('async_hooks');
const openAiService = require('../services/openapi_service');
const groupmeApiService = require('../services/groupme_api_service')

async function handleResponse(message, user) {
    console.log(`Recieved message: ${message} from user ${user}`)

    if(checkForDeletedMessage) {
        return null;
    }

    if(message.toLowerCase().includes('hey crow daddy, ')) {
        console.log(`Request to Crow Daddy made, calling openAI`);
        let string = message.toLowerCase().replace('hey crow daddy, ', '');
        let response = await openAiService.generateAiResponse(string);
        
        if(response) {
            console.log(`response: ${response}`);
            groupmeApiService.sendMessage(response.data.choices[0].text, user);
        }

        return true;
    }

    return null;
}

function checkForDeletedMessage(message) {
    return message === 'A message was deleted.';
}

module.exports = handleResponse;