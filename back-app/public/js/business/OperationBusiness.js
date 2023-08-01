import OperationDAO from "../dao/OperationDAO";
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
        return OperationDAO.getByNum(num);
    }

    static getAll() {
        return OperationDAO.getAll();
    }
}
export default OperationBusiness;
