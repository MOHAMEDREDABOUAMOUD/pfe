const express = require('express');
const path = require('path');
const cors = require("cors");
const EBBusiness = require('../business/EBBusiness');
const AOBusiness = require('../business/AOBusiness');
const FactureBusiness = require('../business/FactureBusiness');
const JournalBusiness = require('../business/JournalBusiness');
const LettreCommissionBusiness = require('../business/LettreCommissionBusiness');
const MarcheBusiness = require('../business/MarcheBusiness');
const OperationBusiness = require('../business/OperationBusiness');
const PieceBusiness = require('../business/PieceBusiness');
const QualificationBusiness = require('../business/QualificationBusiness');
const SecteurBusiness = require('../business/SecteurBusiness');
const UtilisateurBusiness = require('../business/UtilisateurBusiness');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

app.use(express.static('public'));
const port = 8080;

const frontendBuildPath = path.join(__dirname, "../../../../front-app/build");
app.use(express.static(frontendBuildPath));

app.get("/", (req, res) => {
    const filePath = path.join(__dirname, "../../../../front-app/public/index.html");
    res.sendFile(filePath);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../../front-app/src/index.js"));
});

app.post("/signIn", async (req, res) => {
    const { userName, password } = req.body;
    console.log(userName+" , "+password);
    // Implement your sign-in logic here using Firebase
    // (You should initialize Firebase auth at the beginning of server.js)
    const r= await UtilisateurBusiness.getByUserNameAndPassword(userName, password);
    console.log(r);
    if(r==null){
        res.status(401).json({});
    }
    else if(r=={}){
        res.status(200).json({});
    }
    else{
        res.status(200).json(r);
    }
});

// Demarrage du serveur
app.listen(port, () => {
    console.log('Serveur bien demare...')
})