const SecteurDAO = require("../dao/SecteurDAO");

class SecteurBusiness {
    static Add(secteur) {
        return SecteurDAO.create(secteur);
    }

    static update(secteur) {
        return SecteurDAO.update(secteur);
    }

    static delete(num) {
        return SecteurDAO.delete(num);
    }

    static searchByNum(num) {
        return SecteurDAO.getByNum(num);
    }

    static getAll() {
        return SecteurDAO.getAll();
    }
}
module.exports=SecteurBusiness;
