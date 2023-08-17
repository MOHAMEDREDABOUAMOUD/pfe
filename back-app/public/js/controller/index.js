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
const UtilisateurBusiness = require('../business/UtilisateurBusiness');
const bodyParser = require('body-parser');
const Utilisateur = require('../models/utilisateur');
const EB = require('../models/EB');
const Operation = require('../models/Operation');
const LettreCommission = require('../models/LettreCommission');
const Journal = require('../models/Journal');
const AO = require('../models/AO');

const app = express();
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

app.use(express.static('public'));
const port = 8080;
let currentUser = -1;

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
    console.log(userName + " , " + password);
    // Implement your sign-in logic here using Firebase
    // (You should initialize Firebase auth at the beginning of server.js)
    const r = await UtilisateurBusiness.getByUserNameAndPassword(userName, password);
    console.log(r);
    if (r == null) {
        res.status(401).json({});
    }
    else if (r == {}) {
        res.status(200).json({});
    }
    else {
        currentUser = r["immatricule"];
        console.log(currentUser);
        res.status(200).json(r);
    }
});
app.post("/getUsers", async (req, res) => {
    const { id } = req.body;
    const r = await UtilisateurBusiness.getAll();
    console.log(r);
    res.status(200).json(r);
});
app.post("/getEBs", async (req, res) => {
    const { id } = req.body;
    const r = await EBBusiness.getByUserId(currentUser);
    console.log(r);
    res.status(200).json(r);
});
app.post("/getEBsDti", async (req, res) => {
    const { id } = req.body;
    let r = await EBBusiness.getAll(currentUser);
    console.log(r);
    res.status(200).json(r);
});
app.post("/getEBsCM", async (req, res) => {
    const { id } = req.body;
    let r = await EBBusiness.getDem(currentUser);
    console.log(r);
    res.status(200).json(r);
});
app.post("/getEBsDM", async (req, res) => {
    const { id } = req.body;
    let r = await EBBusiness.getForCM(currentUser);//
    console.log(r);
    res.status(200).json(r);
});
app.post("/getUser", async (req, res) => {
    const { id } = req.body;
    const r = await UtilisateurBusiness.searchByNum(id);
    console.log(r);
    res.status(200).json(r);
});
app.post("/getEB", async (req, res) => {
    const { id } = req.body;
    const r = await EBBusiness.searchByNum(id);
    console.log(r);
    res.status(200).json(r);
});
app.post("/getOperations", async (req, res) => {
    const { id } = req.body;
    const r = await OperationBusiness.searchByEBNum(id);
    console.log(r);
    res.status(200).json(r);
});
app.post("/getOperation", async (req, res) => {
    const { id } = req.body;
    const r = await OperationBusiness.searchByNum(id);
    console.log(r);
    res.status(200).json(r);
});
app.post("/getFiles", async (req, res) => {
    const { id } = req.body;
    const r = await PieceBusiness.searchByEBNum(id);
    console.log(r);
    res.status(200).json(r);
});
app.post("/getFile", async (req, res) => {
    const { id } = req.body;
    const r = await PieceBusiness.getPiece(id);
    console.log(r);
    res.status(200).json(r);
});
app.post("/deleteUser", async (req, res) => {
    const { id } = req.body;
    const r = await UtilisateurBusiness.delete(id);
    // console.log(r);
    res.status(200).json(r);
});
app.post("/deleteEB", async (req, res) => {
    const { id } = req.body;
    const r = await EBBusiness.delete(id);
    // console.log(r);
    res.status(200).json(r);
});
app.post("/deleteOperation", async (req, res) => {
    const { id } = req.body;
    const r = await OperationBusiness.delete(id);
    // console.log(r);
    res.status(200).json(r);
});
app.post("/deleteFile", async (req, res) => {
    const { id } = req.body;
    const r = await PieceBusiness.delete(id);
    // console.log(r);
    res.status(200).json(r);
});
//deleteEB
// await axios.post("/createUser", { email:email, nom:nom, prenom:prenom, userName:userName, password:password, fonction:fonction, sexe:sexe });

app.post("/createUser", async (req, res) => {
    const { email, nom, prenom, userName, password, fonction, sexe } = req.body;
    try {
        const r = await UtilisateurBusiness.Add(new Utilisateur({ immatricule: 0, email: email, nom: nom, prenom: prenom, login: userName, pwd: password, fonction: fonction, sexe: sexe }));
        // console.log(r);
        res.status(200).json(r);
    } catch (error) {
        console.log(error);
    }
});

app.post("/createEB", async (req, res) => {
    const { objet, observation, caution, estimation, progNonProg, agence, modePassation, secteur, qualification, fileList, operationList } = req.body;
    EBBusiness.Add(objet, observation, caution, estimation, progNonProg, agence, modePassation, secteur, qualification, fileList, operationList, currentUser);
});
app.post("/createAO", async (req, res) => {
    console.log("enter to createAO");
    const { num, dateOuverturePlis, heureOuverturePlis, datePublicationPortail, dateAchevementTravauxCommission, avis, numEB, dateEnvoieLettreCommission, destinataire, numEnvoieLettreCommission, lettreCommission, dateEnvoieJournal, datePublicationJournal, formatJournal, fournisseurJournal, numEnvoieJournal, lettreJournal } = req.body;
    const re = await LettreCommissionBusiness.Add(new LettreCommission({ num: -1, numEnvoie: numEnvoieLettreCommission, dateEnvoie: dateEnvoieLettreCommission, destinataire: destinataire, lettreCommission: lettreCommission }));
    const r = await AOBusiness.Add(new AO({ num: num, etat: 'en cours', dateOuverturePlis: dateOuverturePlis, heureOuverturePlis: heureOuverturePlis, datePublicationPortail: datePublicationPortail, dateEntreDM: EBBusiness.getCurrentDateInMySQLFormat(), dateAchevementTravauxCommission: dateAchevementTravauxCommission, avis: avis, numEB: numEB, numLettreCommission: re }));
    await JournalBusiness.Add(new Journal({ num: -1, numEnvoie: numEnvoieJournal, format: formatJournal, fournisseur: fournisseurJournal, dateEnvoie: dateEnvoieJournal, datePublication: datePublicationJournal, lettreJournal: lettreJournal, numAo: r }));
});

app.post("/addOperation", async (req, res) => {
    const { id, agence, imputation, nature_projet, operation, programme, situation, superficie, type_projet, piece } = req.body;
    //console.log(objet+", "+observation+", "+progNonProg+", "+fileList+", "+operationList);
    OperationBusiness.Add(new Operation({ code: -1, agence: agence, DA: piece, imputation: imputation, natureProjet: nature_projet, operation: operation, programme: programme, situation: situation, superficie: superficie, typeProjet: type_projet, numEB: id }));
});

app.post("/updateUser", async (req, res) => {
    const { id, email, nom, prenom, login, pwd, fonction, sexe } = req.body;
    try {
        const user = new Utilisateur({ immatricule: id, email: email, nom: nom, prenom: prenom, login: login, pwd: pwd, fonction: fonction, sexe: sexe });
        const r = await UtilisateurBusiness.update(user);
        res.status(200).json(r);
    } catch (error) {
        console.log(error);
    }
});
app.post("/updateEB", async (req, res) => {
    const { id, objet, agence, observation, prog_nonprog, caution, estimation, modePassation, secteur, qualification, numUtilisateur } = req.body;
    console.log("numUtilisateur : " + numUtilisateur);
    try {
        const eb = new EB({ num: id, objet: objet, agence: agence, observation: observation, prog_nonprog: prog_nonprog, classe: EBBusiness.getClasse(), caution: caution, estimation: estimation, dateEB: EBBusiness.getCurrentDateInMySQLFormat(), modePassation: modePassation, dateValidation: EBBusiness.getCurrentDateInMySQLFormat(), validerPar: "", numUtilisateur: numUtilisateur, secteur: secteur, qualification: qualification });
        //, secteur:secteur, qualification:qualification 
        const r = await EBBusiness.update(eb);
        console.warn(r);
        res.status(200).json(r);
    } catch (error) {
        console.log(error);
    }
});
app.post("/updateEBDti", async (req, res) => {
    const { id, objet, agence, observation, prog_nonprog, caution, estimation, modePassation, secteur, qualification, numUtilisateur, validerPar } = req.body;
    console.log("numUtilisateur : " + numUtilisateur);
    try {
        const eb = new EB({ num: id, objet: objet, agence: agence, observation: observation, prog_nonprog: prog_nonprog, classe: EBBusiness.getClasse(), caution: caution, estimation: estimation, dateEB: EBBusiness.getCurrentDateInMySQLFormat(), modePassation: modePassation, dateValidation: EBBusiness.getCurrentDateInMySQLFormat(), validerPar: validerPar, numUtilisateur: numUtilisateur, secteur: secteur, qualification: qualification, });
        //, secteur:secteur, qualification:qualification 
        const r = await EBBusiness.update(eb);
        console.warn(r);
        res.status(200).json(r);
    } catch (error) {
        console.log(error);
    }
});
app.post("/validateEBDti", async (req, res) => {
    const { id, objet, agence, observation, prog_nonprog, caution, estimation, modePassation, secteur, qualification, numUtilisateur } = req.body;
    console.log("numUtilisateur : " + numUtilisateur);
    try {
        const eb = new EB({ num: id, objet: objet, agence: agence, observation: observation, prog_nonprog: prog_nonprog, classe: EBBusiness.getClasse(), caution: caution, estimation: estimation, dateEB: EBBusiness.getCurrentDateInMySQLFormat(), modePassation: modePassation, dateValidation: EBBusiness.getCurrentDateInMySQLFormat(), numUtilisateur: numUtilisateur, secteur: secteur, qualification: qualification, validerPar: currentUser });
        //, secteur:secteur, qualification:qualification 
        const r = await EBBusiness.update(eb);
        console.warn(r);
        res.status(200).json(r);
    } catch (error) {
        console.log(error);
    }
});
app.post("/updateOperation", async (req, res) => {
    const { id, agence, imputation, nature_projet, operation, programme, situation, superficie, type_projet, piece } = req.body;
    //console.log(objet+", "+observation+", "+progNonProg+", "+fileList+", "+operationList);
    OperationBusiness.update(new Operation({ code: id, agence: agence, DA: piece, imputation: imputation, natureProjet: nature_projet, operation: operation, programme: programme, situation: situation, superficie: superficie, typeProjet: type_projet, numEB: -1 }));
});
app.post("/getCurrentUserData", async (req, res) => {
    const { id } = req.body;
    try {
        const user = await UtilisateurBusiness.searchByNum(currentUser);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
});

app.post("/updateSettingsIP", async (req, res) => {
    const { email, nom, prenom } = req.body;
    try {
        const user = new Utilisateur({ immatricule: currentUser, email: email, nom: nom, prenom: prenom, login: "", pwd: "", fonction: "", sexe: "" });
        const r = await UtilisateurBusiness.updateIP(user);
        res.status(200).json(r);
    } catch (error) {
        console.log(error);
    }
});

app.post("/updateSettingsS", async (req, res) => {
    const { login, pwd } = req.body;
    try {
        const user = new Utilisateur({ immatricule: currentUser, email: "", nom: "", prenom: "", login: login, pwd: pwd, fonction: "", sexe: "" });
        const r = await UtilisateurBusiness.updateS(user);
        res.status(200).json(r);
    } catch (error) {
        console.log(error);
    }
});

// Demarrage du serveur
app.listen(port, () => {
    console.log('Serveur bien demare...')
})