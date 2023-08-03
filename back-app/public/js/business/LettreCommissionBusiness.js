const LettreCommissionDAO = require("../dao/LettreCommissionDAO");
class LettreCommissionBusiness {
    static Add(lettreCommission) {
        return LettreCommissionDAO.create(lettreCommission);
    }

    static update(lettreCommission) {
        return LettreCommissionDAO.update(lettreCommission);
    }

    static delete(num) {
        return LettreCommissionDAO.delete(num);
    }

    static searchByNum(num) {
        return LettreCommissionDAO.getByNum(num);
    }

    static getAll() {
        return LettreCommissionDAO.getAll();
    }
}
module.exports=LettreCommissionBusiness;