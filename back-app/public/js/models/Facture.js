class Facture {
    constructor(factureData) {
      this.num = factureData.num;
      this.dateFacture = factureData.dateFacture;
      this.montant = factureData.montant;
      this.numJournal = factureData.numJournal;
    }
  }
  
  module.exports = Facture;
  