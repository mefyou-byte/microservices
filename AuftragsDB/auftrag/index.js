const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const auftrag = {};

/*
TODO: 
1.) post/Auftrag erstellen -> alles an den Event-Bus weiterleiten 
*/

app.post("/auftrag", async (req, res) => {
    const AuftragsID = randomBytes(4).toString("hex"); 

    // POST Body -> Auftragsname, position; 

    const {Auftragsname, Auftragsposition} = req.body; 
    

    let auftragspositionNamed; 

     switch(Auftragsposition){
         case "1":   
         auftragspositionNamed=  "Hoch"; 
         break; 
        case "2": 
        auftragspositionNamed ="Mittel"; 
        break; 
        case "3":
        auftragspositionNamed = "Niedrig"; 
        break; 
        default: console.log("NOT FOUND"); 
     }

     auftrag[AuftragsID] = {
        AuftragsID, 
        Auftragsname, 
        Auftragsposition, 
        auftragspositionNamed
    }


   if(auftragspositionNamed !== undefined){

    // event bus 
    res.status(201).send(auftrag[AuftragsID]);
    await axios.post("http://localhost:4001/events", {
         eventType: "createAuftrag", 
         objectData: {
            auftragsID: AuftragsID,
            auftragsName: Auftragsname, 
            auftragsposition: Auftragsposition, 
            auftragspositionName: auftragspositionNamed
       
         }
     }); 

     // auftrag speichern
 

   }
     else {
         res.status(417).send(); 
   }
})

// get AuftragsID
app.get("/auftrag/:auftragsID", (req, res) => {
    res.status(201).send(auftrag[req.params.auftragsID]); 
})

// PUT 
app.put("/auftrag/:auftragsID", (req, res) => {
    const auftragsID = req.params.auftragsID; 
    const {Auftragsname, Auftragsposition} = req.body; 

    auftrag[auftragsID].Auftragsname = Auftragsname; 
    auftrag[auftragsID].Auftragsposition = Auftragsposition; 

    res.status(201).send(auftrag[auftragsID]); 
})


// delete 
app.delete("/auftrag/:auftragsID", async (req, res) => {
    const auftragsID = req.params.auftragsID; 

    // eventbus
    await axios.post("http://localhost:4001/events", {
        eventType: "deleteAuftrag", 
        objectData: auftrag[auftragsID]
    }); 
    
    delete auftrag[auftragsID]; 

    res.status(217).send(auftrag[auftragsID]); 
})


app.get("/auftrag",(req, res) => {
    res.status(201).send(auftrag); 
})

app.listen(4000, () => {
  console.log('Listening on 4000');
});