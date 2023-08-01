import UtilisateurDAO from "../dao/UtilisateurDAO";

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

    static getAll() {
        return UtilisateurDAO.getAll();
    }
}
export default UtilisateurBusiness;
