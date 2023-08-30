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
const sendEmail = require('../business/sendMail');

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
app.post("/getPassword", async (req, res) => {
    const { email } = req.body;
    const r = await UtilisateurBusiness.getPassword(email);
    console.log(r);
    res.status(200).json(r);
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
app.post("/updateEtatDM", async (req, res) => {
    const { id } = req.body;
    const r = await EBBusiness.updateEtatDM(id);
    res.status(200).json(r);
});
app.post("/updateEtatRefuser", async (req, res) => {
    const { id } = req.body;
    const e = await UtilisateurBusiness.searchByNum(currentUser);
    const r = await EBBusiness.updateEtatRefuser(id, e.fonction);
    res.status(200).json(r);
});
app.post("/getJournals", async (req, res) => {
    const { id } = req.body;
    const r = await JournalBusiness.getByNumAO(id);
    console.log(r);
    res.status(200).json(r);
});
app.post("/getJournal", async (req, res) => {
    const { id } = req.body;
    const r = await JournalBusiness.searchByNum(id);
    console.log(r);
    res.status(200).json(r);
});
app.post("/getCommission", async (req, res) => {
    const { id } = req.body;
    const r = await LettreCommissionBusiness.searchByNum(id);
    console.log(r);
    res.status(200).json(r);
});
app.post("/getAOs", async (req, res) => {
    const { id } = req.body;
    const r = await AOBusiness.getByUserId(currentUser);
    console.log(r);
    res.status(200).json(r);
});
app.post("/getAllAOs", async (req, res) => {
    const { id } = req.body;
    const r = await AOBusiness.getAll();
    console.log(r);
    res.status(200).json(r);
});
app.post("/sendpassword", async (req, res) => {
    const { email } = req.body;
    const r = await sendEmail(email);
    console.log(r);
    res.status(200).json(r);
});
app.post("/getLettreCommission", async (req, res)=>{
    const { id } = req.body;
    const r = await LettreCommissionBusiness.searchByNum(id);
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
    let r = await EBBusiness.getForDM(currentUser);
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
    console.log("numEB : "+id);
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
app.post("/deleteJournal", async (req, res) => {
    const { id } = req.body;
    const r = await JournalBusiness.delete(id);
    // console.log(r);
    res.status(200).json(r);
});
app.post("/deleteLettreCommission", async (req, res) => {
    const { id } = req.body;
    const r = await LettreCommissionBusiness.delete(id);
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
    const { immatricule, email, nom, prenom, userName, password, fonction, sexe } = req.body;
    try {
        const r = await UtilisateurBusiness.Add(new Utilisateur({ immatricule: immatricule, email: email, nom: nom, prenom: prenom, login: userName, pwd: password, fonction: fonction, sexe: sexe }));
        //console.log(r);
        if(r===null){
            res.status(401).json(error);
        }
        else{
            res.status(200).json(r);
        }
    } catch (error) {
        console.log(error);
        res.status(401).json(error);
    }
});

app.post("/createEB", async (req, res) => {
    const {objet, observation, caution, estimation, progNonProg, agence, modePassation, secteur, qualification, fileList, operationList } = req.body;
    console.log("prognonprog : "+progNonProg);
    EBBusiness.Add("En cours de validation par la dti", objet, observation, caution, estimation, progNonProg, agence, modePassation, secteur, qualification, fileList, operationList, currentUser);
});
app.post("/createEBDti", async (req, res) => {
    const {objet, observation, caution, estimation, progNonProg, agence, modePassation, secteur, qualification, fileList, operationList } = req.body;
    console.log("prognonprog : "+progNonProg);
    EBBusiness.Add("En cours de validation par le CM", objet, observation, caution, estimation, progNonProg, agence, modePassation, secteur, qualification, fileList, operationList, currentUser);
});
app.post("/createAO", async (req, res) => {
    const { num, dateOuverturePlis, heureOuverturePlis, datePublicationPortail, dateAchevementTravauxCommission, avis, fileNameAvis, numEB, dateEnvoieLettreCommission, destinataire, numEnvoieLettreCommission, lettreCommission, fileNameLC, listJournal } = req.body;
    console.log(fileNameAvis+", "+fileNameLC);
    const re = await LettreCommissionBusiness.Add(new LettreCommission({ num: -1, fileName: fileNameLC, numEnvoie: numEnvoieLettreCommission, dateEnvoie: dateEnvoieLettreCommission, destinataire: destinataire, lettreCommission: lettreCommission }));
    await AOBusiness.Add(new AO({ num: num, fileName: fileNameAvis, dateOuverturePlis: dateOuverturePlis, heureOuverturePlis: heureOuverturePlis, datePublicationPortail: datePublicationPortail, dateEntreDM: EBBusiness.getCurrentDateInMySQLFormat(), dateAchevementTravauxCommission: dateAchevementTravauxCommission, avis: avis, numEB: numEB, numLettreCommission: re }));
    for (let i = 0; i < listJournal.length; i++) {
        await JournalBusiness.Add(new Journal({ num: -1, fileName: listJournal[i]["fileNameJ"], numEnvoie: listJournal[i]["numEnvoieJournal"], format: listJournal[i]["formatJournal"], fournisseur: listJournal[i]["fournisseurJournal"], dateEnvoie: listJournal[i]["dateEnvoieJournal"], datePublication: listJournal[i]["datePublicationJournal"], lettreJournal: listJournal[i]["lettreJournal"], numAo: num }));        
    }
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
app.post("/updateAvis", async (req, res) => {
    const { piece, fileName, id } = req.body;
    try {
        const r = await AOBusiness.updateAvis(piece, fileName, id);
        res.status(200).json(r);
    } catch (error) {
        console.log(error);
    }
});
app.post("/updateLettreJournal", async (req, res) => {
    const { piece, fileName, id } = req.body;
    try {
        const r = await JournalBusiness.updateLettreJournal(piece, fileName, id);
        res.status(200).json(r);
    } catch (error) {
        console.log(error);
    }
});
app.post("/updateLettreCommission", async (req, res) => {
    const { piece, fileName, id } = req.body;
    try {
        const r = await LettreCommissionBusiness.updateLettreCommission(piece, fileName, id);
        res.status(200).json(r);
    } catch (error) {
        console.log(error);
    }
});
app.post("/updateEB", async (req, res) => {
    const { id, etat, objet, agence, observation, prog_nonprog, caution, estimation, modePassation, secteur, qualification, numUtilisateur } = req.body;
    console.log("numUtilisateur : " + numUtilisateur);
    try {
        const eb = new EB({ num: id, etat:etat, objet: objet, agence: agence, observation: observation, prog_nonprog: prog_nonprog, classe: EBBusiness.getClasse(secteur, estimation), caution: caution, estimation: estimation, dateEB: EBBusiness.getCurrentDateInMySQLFormat(), modePassation: modePassation, dateValidation: EBBusiness.getCurrentDateInMySQLFormat(), validerPar: "", numUtilisateur: numUtilisateur, secteur: secteur, qualification: qualification });
        //, secteur:secteur, qualification:qualification 
        const r = await EBBusiness.update(eb);
        console.warn(r);
        res.status(200).json(r);
    } catch (error) {
        console.log(error);
    }
});
app.post("/updateJournal", async (req, res) => {
    const { num, fileName, numEnvoie, format, fournisseur, dateEnvoie, datePublication} = req.body;
    try {
        const j=new Journal({ num, fileName, numEnvoie, format, fournisseur, dateEnvoie, datePublication});
        const r = await JournalBusiness.update(j);
        console.warn(r);
        res.status(200).json(r);
    } catch (error) {
        console.log(error);
    }
});
app.post("/updateCommission", async (req, res) => {
    const { num,numEnvoie, destinataire, dateEnvoie} = req.body;
    try {
        const j=new LettreCommission({ num,numEnvoie, destinataire, dateEnvoie});
        const r = await LettreCommissionBusiness.update(j);
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
        const eb = new EB({ num: id, etat: etat, objet: objet, agence: agence, observation: observation, prog_nonprog: prog_nonprog, classe: EBBusiness.getClasse(secteur, estimation), caution: caution, estimation: estimation, dateEB: EBBusiness.getCurrentDateInMySQLFormat(), modePassation: modePassation, dateValidation: EBBusiness.getCurrentDateInMySQLFormat(), validerPar: validerPar, numUtilisateur: numUtilisateur, secteur: secteur, qualification: qualification, });
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
        const eb = new EB({ num: id, objet: objet, agence: agence, observation: observation, prog_nonprog: prog_nonprog, classe: EBBusiness.getClasse(secteur, estimation), caution: caution, estimation: estimation, dateEB: EBBusiness.getCurrentDateInMySQLFormat(), modePassation: modePassation, dateValidation: EBBusiness.getCurrentDateInMySQLFormat(), numUtilisateur: numUtilisateur, secteur: secteur, qualification: qualification, validerPar: currentUser });
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
        console.log("user : "+user);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
});
app.post("/getNotifications", async (req, res) => {
    const { id } = req.body;
    try {
        const user = await UtilisateurBusiness.getNotifications(currentUser);
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
//jhjhjhjhjh

// Demarrage du serveur
app.listen(port, () => {
    console.log('Serveur bien demare...')
})