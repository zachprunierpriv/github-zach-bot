#!/usr/bin/node
const express = require('express');

const app = express();
const port = 8080;

// app.use(express.urlencoded({extended: true}));
// app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get('/api/healthcheck', (req, res) => {
    res.send('OK!');
})


