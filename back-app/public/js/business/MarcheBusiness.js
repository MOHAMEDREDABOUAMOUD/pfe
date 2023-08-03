const MarcheDAO = require("../dao/MarcheDAO");
class MarcheBusiness {
    static Add(marche) {
        return MarcheDAO.create(marche);
    }

    static update(marche) {
        return MarcheDAO.update(marche);
    }

    static delete(num) {
        return MarcheDAO.delete(num);
    }

    static searchByNum(num) {
        return MarcheDAO.getByNum(num);
    }

    static getAll() {
        return MarcheDAO.getAll();
    }
}
module.exports=MarcheBusiness;