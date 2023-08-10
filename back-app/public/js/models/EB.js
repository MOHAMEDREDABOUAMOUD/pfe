class EB {
  constructor(ebData) {
    this.num = ebData.num;
    this.objet = ebData.objet;
    this.agence = ebData.agence;
    this.observation = ebData.observation;
    this.prog_nonprog = ebData.prog_nonprog;
    this.classe = ebData.classe;
    this.caution = ebData.caution;
    this.estimation = ebData.estimation;
    this.dateEB = ebData.dateEB;
    this.modePassation = ebData.modePassation;
    this.dateValidation = ebData.dateValidation;
    this.validerPar = ebData.validerPar;
    this.numUtilisateur = ebData.numUtilisateur;
    this.qualification=ebData.qualification;
    this.secteur=ebData.secteur;
  }
}

module.exports = EB;
