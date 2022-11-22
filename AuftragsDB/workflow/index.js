const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const workflow = [];


app.post("/workflow", async (req, res) => {
   
    const {eventType, objData} = req.body; 


    workflow.push(req.body); 
    if(eventType == "createAuftrag"){
        res.status(217).send(objData); 
    } else if(eventType == "deleteAuftrag"){
        
        const ID = objData.AuftragsID; 

        delete objData[ID]; 

        res.status(217).send(objData);
    }

  


})

app.get("/workflow",(req, res) => {
    res.status(201).send(workflow); 
})

app.listen(4002, () => {
  console.log('Listening on 4002');
});