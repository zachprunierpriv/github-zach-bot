#!/usr/bin/node
const axios = require('axios');
const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;
const headers = {
    headers: {
        'X-Access-Token': process.env.GROUPME_API_KEY
    }
}

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.post('/api/message', (req, res) => {
    console.log(req.body);
    try {
        if(req.body.text.toLowerCase().trim() === 'caw caw') {
            console.log('making post request to groupme');
            axios.post('https://api.groupme.com/v3/bots/post', {"text" : "CAW", "bot_id" : "04f99dc63c3726526ed27a1d9e"}, headers);
        }
    } catch (e) {
        console.log(`Error handling message from groupme ${e.message}`);
    }
    res.sendStatus(200);
})

app.get('/api/healthcheck', (req, res) => {
    res.send('OK!');
})


