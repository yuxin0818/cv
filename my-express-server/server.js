
const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send('hello world')
})

app.get('/contact', function(req, res) {
    res.send('Contact me: yuxinchen0818@gmail.coom')
})

app.listen(3000, "0.0.0.0");

