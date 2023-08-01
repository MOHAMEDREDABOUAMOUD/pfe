import EBDAO from "../dao/EBDAO";

class EBBusiness {
    static Add(eb) {
        return EBDAO.create(eb);
    }

    static update(eb) {
        return EBDAO.update(ao);
    }

    static delete(num) {
        return EBDAO.delete(num);
    }

    static searchByNum(num) {
        return EBDAO.getByNum(num);
    }

    static getAll() {
        return EBDAO.getAll();
    }
}
export default EBBusiness;
