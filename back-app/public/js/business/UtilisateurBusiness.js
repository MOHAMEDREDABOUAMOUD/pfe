const UtilisateurDAO = require("../dao/UtilisateurDAO");

class UtilisateurBusiness {
    static Add(utilisateur) {
        return UtilisateurDAO.create(utilisateur);
    }

    static update(utilisateur) {
        return UtilisateurDAO.update(utilisateur);
    }

    static updateIP(utilisateur) {
        return UtilisateurDAO.updateIP(utilisateur);
    }
    
    static updateS(utilisateur) {
        return UtilisateurDAO.updateS(utilisateur);
    }

    static delete(num) {
        return UtilisateurDAO.delete(num);
    }

    static async searchByNum(num) {
        return await UtilisateurDAO.getByImmatricule(num);
    }

    static async getByUserNameAndPassword(userName, password){
        return await UtilisateurDAO.getByUserNameAndPassword(userName, password);
    }

    static async getAll() {
        return await UtilisateurDAO.getAll();
    }
}
module.exports=UtilisateurBusiness;