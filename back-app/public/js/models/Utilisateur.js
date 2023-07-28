class Utilisateur {
    constructor(login, pwd, nom, prenom, email, fonction, sexe) {
      this.login = login;
      this.pwd = pwd;
      this.nom=nom;
      this.prenom=prenom;
      this.email=email;
      this.fonction=fonction;
      this.sexe=sexe;
    }
  }
  
  export default Utilisateur;