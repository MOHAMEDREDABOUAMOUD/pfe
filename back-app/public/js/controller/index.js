const express = require('express');
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
const app  = express();

app.use(express.static('public'));

const getEB = () => {
    try {
      const snapshot = EBBusiness.getAll();
      snapshot.forEach((doc) => {
        console.log("EB ID: ", doc.id);
        console.log("EB Data: ", doc);
      });
    } catch (error) {
      console.error("Error fetching hospital data:", error);
    }
  };

// Demarrage du serveur
app.listen(8080, () => {
    console.log('Serveur bien demare...')
})