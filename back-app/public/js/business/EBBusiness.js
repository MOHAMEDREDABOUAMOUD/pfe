const EBDAO = require("../dao/EBDAO");
const EB = require("../models/EB");
const Operation = require("../models/Operation");
const Piece = require("../models/Piece");
const OperationBusiness = require("./OperationBusiness");
const PieceBusiness = require("./PieceBusiness");

class EBBusiness {
    static Add(eb) {
        return EBDAO.create(eb);
    }

    static getClasse(secteur, estimation) {
        return "1-1";
    }

    static getCurrentDateInMySQLFormat() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month starts from 0 (January = 0)
        const day = String(currentDate.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    static async Add(object, observation, caution, estimation, progNonProg, agence, modePassation, secteur, qualification, fileList, operationList, currentUser) {
        const eb = new EB({ num: -1, objet: object, agence: agence, observation: observation, prog_nonprog: progNonProg, classe: this.getClasse(secteur, estimation), caution: caution, estimation: estimation, dateEB: this.getCurrentDateInMySQLFormat(), modePassation: modePassation, dateValidation: this.getCurrentDateInMySQLFormat(), validerPar: "", numUtilisateur: currentUser, qualification:qualification, secteur:secteur });
        const idEB = await EBDAO.create(eb);
        console.log("eb added : " + idEB);
        for (let i = 0; i < fileList.length; i++) {
            await PieceBusiness.Add(new Piece({ num: -1, libelle: fileList[i]["name"], piece: fileList[i]["file"], fileName: fileList[i]["fileName"], numEB: idEB }));
            console.log(fileList);//[i]["file"]
        }
        console.log("pieces added");
        for (let i = 0; i < operationList.length; i++) {
            await OperationBusiness.Add(new Operation({ code: -1, agence: operationList[i]["agence"], DA: operationList[i]["daFile"], imputation: operationList[i]["imputation"], natureProjet: operationList[i]["natureProjet"], operation: operationList[i]["operation"], programme: operationList[i]["programme"], situation: operationList[i]["situation"], superficie: operationList[i]["superficie"], typeProjet: operationList[i]["typeProjet"], numEB: idEB }));
        }
        console.log("operations added");
    }

    static update(eb) {
        return EBDAO.update(eb);
    }

    static delete(num) {
        return EBDAO.delete(num);
    }

    static searchByNum(num) {
        return EBDAO.getByNum(num);
    }

    static getByUserId(id){
        return EBDAO.getByUserId(id);
    }

    static getByUserId2(id){
        return EBDAO.getByUserId2(id);
    }

    static getAll(currentUser) {
        return EBDAO.getAll(currentUser);
    }

    static getAll2(currentUser) {
        return EBDAO.getAll2(currentUser);
    }

    static getDem(currentUser){
        return EBDAO.getDem(currentUser);
    }

    static getDem2(currentUser){
        return EBDAO.getDem2(currentUser);
    }

    static getForDM(currentUser){
        return EBDAO.getForDM(currentUser);
    }

    static getForDM2(currentUser){
        return EBDAO.getForDM2(currentUser);
    }
}
module.exports = EBBusiness;