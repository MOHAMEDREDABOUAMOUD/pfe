const OperationDAO = require("../dao/OperationDAO");
class OperationBusiness {
    static Add(operation) {
        return OperationDAO.create(operation);
    }

    static update(operation) {
        return OperationDAO.update(operation);
    }

    static delete(num) {
        return OperationDAO.delete(num);
    }

    static searchByNum(num) {
        return OperationDAO.getByCode(num);
    }

    static getAll() {
        return OperationDAO.getAll();
    }

    static searchByEBNum(id){
        return OperationDAO.searchByEBNum(id);
    }
}
module.exports=OperationBusiness;
