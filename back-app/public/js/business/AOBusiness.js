const AODAO = require("../dao/AODAO");

class AOBusiness {
    static async Add(ao) {
        return await AODAO.create(ao);
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

    static getByUserId(currentUser){
        return AODAO.getByUserId(currentUser);
    }

    static getAll() {
        return AODAO.getAll();
    }
}
module.exports=AOBusiness;