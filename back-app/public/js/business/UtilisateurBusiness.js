const UtilisateurDAO = require("../dao/UtilisateurDAO");

class UtilisateurBusiness {
    static Add(utilisateur) {
        return UtilisateurDAO.create(utilisateur);
    }

    static update(utilisateur) {
        return UtilisateurDAO.update(utilisateur);
    }

    static delete(num) {
        return UtilisateurDAO.delete(num);
    }

    static searchByNum(num) {
        return UtilisateurDAO.getByNum(num);
    }

    static async getByUserNameAndPassword(userName, password){
        return await UtilisateurDAO.getByUserNameAndPassword(userName, password);
    }

    static getAll() {
        return UtilisateurDAO.getAll();
    }
}
module.exports=UtilisateurBusiness;