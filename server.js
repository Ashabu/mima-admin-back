const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const server = express();

server.use('/', (req, res, next) => {
    res.status(200).send('<h1>Hello from Node</h1>')
})

server.listen(8080);