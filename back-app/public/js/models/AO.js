class AO {
    constructor(aoData) {
      this.num = aoData.num;
      this.etat = aoData.etat;
      this.dateOuverturePlis = aoData.dateOuverturePlis;
      this.heureOuverturePlis = aoData.heureOuverturePlis;
      this.datePublicationPortail = aoData.datePublicationPortail;
      this.dateEntreDM = aoData.dateEntreDM;
      this.dateAchevementTravauxCommission = aoData.dateAchevementTravauxCommission;
      this.avis = aoData.avis;
      this.fileName = aoData.fileName;
      this.numEB = aoData.numEB;
      this.numLettreCommission = aoData.numLettreCommission;
    }
  }
  
  module.exports = AO;
  