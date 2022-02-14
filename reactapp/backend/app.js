const express= require ("express");
const bodyParser = require('body-parser');
require("dotenv").config();
const app= express();
const userRouter=require("./router/router");
const cors=require("cors");
const https = require('https');
const fs = require('fs');



const options = {
  key: fs.readFileSync('../localhost-key.pem'),
  cert: fs.readFileSync('../localhost.pem') 
}

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS" );
    next();
  });
app.use(userRouter);


// TOGLIERE COMMENTO QUI PER SERVER HTTP

//  app.listen("8080",()=>{
//      console.log("Server up is running on Port: 8080");
//  })


//SERVER HTTPS
 https.createServer(options, app).listen("8080",() => {
   console.log('Server listening on port:8080');
 });