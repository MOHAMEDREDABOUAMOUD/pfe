class Utilisateur {
  constructor(userData) {
    this.immatricule = userData.immatricule;
    this.login = userData.login;
    this.pwd = userData.pwd;
    this.nom = userData.nom;
    this.prenom = userData.prenom;
    this.email = userData.email;
    this.fonction = userData.fonction;
    this.sexe = userData.sexe;
  }
  }
  module.exports=Utilisateur;