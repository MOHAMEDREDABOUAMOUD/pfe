const LettreCommissionDAO = require("../dao/LettreCommissionDAO");
class LettreCommissionBusiness {
    static async Add(lettreCommission) {
        return await LettreCommissionDAO.create(lettreCommission);
    }

    static update(lettreCommission) {
        return LettreCommissionDAO.update(lettreCommission);
    }

    static updateLettreCommission(piece, fileName, id){
        return LettreCommissionDAO.updateLettreCommission(piece, fileName, id);
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