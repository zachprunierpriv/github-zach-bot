#!/usr/bin/node
const axios = require('axios');
const express = require('express');

const app = express();
const port = process.env.port || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.post('/api/message', (req, res) => {
    console.log(req);
    if(req.body.text == 'caw caw') {
        axios.post('https://api.groupme.com/v3/bots/post', {"text" : "CAW", "bot_id" : "04f99dc63c3726526ed27a1d9e"});
    }
})

app.get('/api/healthcheck', (req, res) => {
    res.send('OK!');
})


