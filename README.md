** Update Matiou -> SETUP and first steps, 

1.) npm init -y 
2.) npm install cors express axios nodemon
3.) create index.js

index.js


const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const vorlage = {};

app.listen(4000, () => {
  console.log('Listening on 4000');
});



package.json 
{
  "name": "**ÄNDERN**",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.21.1",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "nodemon": "^2.0.7"
  }
}
