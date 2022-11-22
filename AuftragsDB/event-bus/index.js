const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const events = [];


app.post("/events", async (req, res) => {
   const eventbody = req.body; 


   // 1-2 
   events.push(eventbody); 

  await axios.post("http://localhost:4002/workflow", {
        event: eventbody
   })


})

app.get("/events",(req, res) => {
    res.status(201).send(events); 
})

app.listen(4001, () => {
  console.log('Listening on 4000');
});