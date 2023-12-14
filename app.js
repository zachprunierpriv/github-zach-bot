require('dotenv').config();
const express = require('express');
const ResponseHandler = require('./src/handlers/handle_response')
const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.post('/api/message', async (req, res) => {
    try {
        let handler = new ResponseHandler();
        response = await handler.handleResponse(req.body.text, req.body.name);
        res.sendStatus(200);
    } catch (e) {
        console.log(`Error handling message from groupme ${e.message}`);
        throw e;
    }
})

app.get('/api/healthcheck', (req, res) => {
    res.send('OK!');
})
