const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');


const router = express.Router();

const db = require('./database');

const server = express();



const connectDB = async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

connectDB();

// server.use('/', (req, res, next) => {
//   db.query('SELECT * FROM users')
//   .then(function(dps) {
//      console.log(dps)
    
//     return res.status(100).send("dps")
    
//   });
//   res.end();
// })


server.get('/', (req, res, next) => {

    db.query('SELECT * FROM users')
  .then(function(dps) {
     console.log(dps)
    
     res.status(200) .send(dps).header({"content-type":"application/json"})
    
  });
   // res.status(200).send('<h1>Hello from Node</h1>')
})

server.listen(8080);