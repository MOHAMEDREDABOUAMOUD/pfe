const AODAO = require("../dao/AODAO");

class AOBusiness {
    static Add(ao) {
        return AODAO.create(ao);
    }

    static update(ao) {
        return AODAO.update(ao);
    }

    static delete(num) {
        return AODAO.delete(num);
    }

    static searchByNum(num) {
        return AODAO.getByNum(num);
    }

    static getAll() {
        return AODAO.getAll();
    }
}
module.exports=AOBusiness;