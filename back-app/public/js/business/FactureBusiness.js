const FactureDAO = require("../dao/FactureDAO");
class FactureBusiness {
    static Add(facture) {
        return FactureDAO.create(facture);
    }

    static update(facture) {
        return FactureDAO.update(ao);
    }

    static delete(num) {
        return FactureDAO.delete(num);
    }

    static searchByNum(num) {
        return FactureDAO.getByNum(num);
    }

    static getAll() {
        return FactureDAO.getAll();
    }
}
module.exports=FactureBusiness;