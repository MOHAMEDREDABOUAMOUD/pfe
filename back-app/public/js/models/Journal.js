class Journal {
    constructor(journalData) {
      this.num = journalData.num;
      this.numEnvoie = journalData.numEnvoie;
      this.format = journalData.format;
      this.fournisseur = journalData.fournisseur;
      this.dateEnvoie = journalData.dateEnvoie;
      this.datePublication = journalData.datePublication;
      this.lettreJournal = journalData.lettreJournal;
      this.numAo = journalData.numAo;
    }
  }
  
  module.exports = Journal;
  