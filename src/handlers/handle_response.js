const openAiService = require('../services/openapi_service');
const groupmeApiService = require('../services/groupme_api_service')

const handleResponse = async function (message, user) {
    console.log(`Recieved message: ${message} from user ${user}`)

    if(checkForDeletedMessage(message)) {
        return null;
    }
    if(message.toLowerCase().includes('hey crow daddy, ')) {
        console.log(`Request to Crow Daddy made, calling openAI`);
        let string = message.toLowerCase().replace('hey crow daddy, ', '');
        let response = await openAiService.generateAiResponse(string);
        
        if(response) {
            console.log(`response: ${JSON.stringify(response)}`);
            let messageArr = [];
            let aiMessage = response.choices[0].message.content;
            if (aiMessage.length >= 900) {
                messageArr = breakupString(aiMessage);
                messageArr.forEach(message => {
                    groupmeApiService.sendMessage(message, user);
                })
                return true;
            } else {
                groupmeApiService.sendMessage(aiMessage, user);

            }
        }

        return true;
    }

    return null;
}

function breakupString(str) {
    let arr = [];
    let tempStr = '';
    let counter = 0
    let letters = str.split('');

    letters.forEach(letter => {
        tempStr = tempStr+letter;
        if(counter === 500) {
            arr.push(tempStr);
            counter = 0;
        }
        counter++;
    });

    return arr;
}

function checkForDeletedMessage(message) {
    return message === 'A message was deleted.';
}

module.exports = {handleResponse};