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

    static getByEBNum(num){
        return AODAO.getByEBNum(num);
    }

    static updateAvis(piece, fileName, id){
        return AODAO.updateAvis(piece, fileName, id);
    }

    
    static getDashboardData(){
        return AODAO.getDashboardData();
    }
}
module.exports=AOBusiness;