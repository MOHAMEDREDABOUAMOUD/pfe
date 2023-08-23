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
        if(secteur==="Terrassements"){
            if(estimation==="1.02"){
                return "1-1";
            }
            else if(estimation==="2.55"){
                return "1-2";
            }
            else if(estimation==="5.1"){
                return "1-3";
            }
            else if(estimation==="12.75"){
                return "1-4";
            }
            else if(estimation==="25.5"){
                return "1-5";
            }
            else{
                return "1-6";
            }
        }
        else if(secteur==="Travaux de voirie"){
            if(estimation==="1.02"){
                return "2-1";
            }
            else if(estimation==="2.55"){
                return "2-2";
            }
            else if(estimation==="5.1"){
                return "2-3";
            }
            else if(estimation==="12.75"){
                return "2-4";
            }
            else if(estimation==="25.5"){
                return "2-5";
            }
            else{
                return "2-6";
            }
        }
        else if(secteur==="Assainissement - Pose de conduites"){
            if(estimation==="1.02"){
                return "3-1";
            }
            else if(estimation==="2.55"){
                return "3-2";
            }
            else if(estimation==="5.1"){
                return "3-3";
            }
            else if(estimation==="12.75"){
                return "3-4";
            }
            else if(estimation==="25.5"){
                return "3-5";
            }
            else{
                return "3-6";
            }
        }
        else if(secteur==="Travaux d’électrification"){
            if(estimation==="1.02"){
                return "4-1";
            }
            else if(estimation==="2.55"){
                return "4-2";
            }
            else if(estimation==="5.1"){
                return "4-3";
            }
            else if(estimation==="12.75"){
                return "4-4";
            }
            else if(estimation==="25.5"){
                return "4-5";
            }
            else{
                return "4-6";
            }
        }
        else if(secteur==="Eau Potable"){
            if(estimation==="1.02"){
                return "5-1";
            }
            else if(estimation==="2.55"){
                return "5-2";
            }
            else if(estimation==="5.1"){
                return "5-3";
            }
            else if(estimation==="12.75"){
                return "5-4";
            }
            else if(estimation==="25.5"){
                return "5-5";
            }
            else{
                return "5-6";
            }
        }
        else if(secteur==="Réseaux Téléphoniques"){
            if(estimation==="0.51"){
                return "6-2";
            }
            else if(estimation==="2.55"){
                return "6-3";
            }
            else if(estimation==="5.1"){
                return "6-4";
            }
            else if(estimation==="10.2"){
                return "6-5";
            }
            else{
                return "6-6";
            }
        }
        else if(secteur==="Jardins – Espaces verts"){
            if(estimation==="0.51"){
                return "7-2";
            }
            else if(estimation==="2.55"){
                return "7-3";
            }
            else if(estimation==="5.1"){
                return "7-4";
            }
            else if(estimation==="10.2"){
                return "7-5";
            }
            else{
                return "7-6";
            }
        }
        else if(secteur==="Réalisation d’ouvrages d’art"){
            if(estimation==="1.02"){
                return "8-1";
            }
            else if(estimation==="2.55"){
                return "8-2";
            }
            else if(estimation==="5.1"){
                return "8-3";
            }
            else if(estimation==="12.75"){
                return "8-4";
            }
            else if(estimation==="25.5"){
                return "8-5";
            }
            else{
                return "8-6";
            }
        }
        else if(secteur==="Gros -œuvres"){
            if(estimation==="1.02"){
                return "9-1";
            }
            else if(estimation==="2.55"){
                return "9-2";
            }
            else if(estimation==="5.1"){
                return "9-3";
            }
            else if(estimation==="12.75"){
                return "9-4";
            }
            else if(estimation==="25.5"){
                return "9-5";
            }
            else{
                return "9-6";
            }
        }
        else if(secteur==="Menuiserie Bois - Charpente"){
            if(estimation==="1.02"){
                return "10-1";
            }
            else if(estimation==="2.55"){
                return "10-2";
            }
            else if(estimation==="5.1"){
                return "10-3";
            }
            else if(estimation==="12.75"){
                return "10-4";
            }
            else if(estimation==="25.5"){
                return "10-5";
            }
            else{
                return "10-6";
            }
        }
        else if(secteur==="Menuiserie aluminium, pvc et ferronnerie"){
            if(estimation==="1.02"){
                return "11-1";
            }
            else if(estimation==="2.55"){
                return "11-2";
            }
            else if(estimation==="5.1"){
                return "11-3";
            }
            else if(estimation==="12.75"){
                return "11-4";
            }
            else if(estimation==="25.5"){
                return "11-5";
            }
            else{
                return "11-6";
            }
        }
        else if(secteur==="Ascenseurs – Monte charges"){
            if(estimation==="0.51"){
                return "12-2";
            }
            else if(estimation==="2.55"){
                return "12-3";
            }
            else if(estimation==="5.1"){
                return "12-4";
            }
            else if(estimation==="10.2"){
                return "12-5";
            }
            else{
                return "12-6";
            }
        }
        else if(secteur==="Plomberie – Chauffage - Climatisation"){
            if(estimation==="1.02"){
                return "13-1";
            }
            else if(estimation==="2.55"){
                return "13-2";
            }
            else if(estimation==="5.1"){
                return "13-3";
            }
            else if(estimation==="12.75"){
                return "13-4";
            }
            else if(estimation==="25.5"){
                return "13-5";
            }
            else{
                return "13-6";
            }
        }
        else if(secteur==="Électricité"){
            if(estimation==="0.51"){
                return "14-2";
            }
            else if(estimation==="2.55"){
                return "14-3";
            }
            else if(estimation==="5.1"){
                return "14-4";
            }
            else if(estimation==="10.2"){
                return "14-5";
            }
            else{
                return "14-6";
            }
        }
        else if(secteur==="Téléphone - Sonorisation"){
            if(estimation==="0.51"){
                return "15-2";
            }
            else if(estimation==="1.53"){
                return "15-3";
            }
            else if(estimation==="2.55"){
                return "15-4";
            }
            else if(estimation==="5.1"){
                return "15-5";
            }
            else{
                return "15-6";
            }
        }
        else if(secteur==="Peinture - Vitrerie"){
            if(estimation==="0.51"){
                return "16-2";
            }
            else if(estimation==="2.55"){
                return "16-3";
            }
            else if(estimation==="5.1"){
                return "16-4";
            }
            else if(estimation==="10.2"){
                return "16-5";
            }
            else{
                return "16-6";
            }
        }
        else if(secteur==="Etanchéité - Isolation"){
            if(estimation==="0.51"){
                return "17-2";
            }
            else if(estimation==="2.55"){
                return "17-3";
            }
            else if(estimation==="5.1"){
                return "17-4";
            }
            else if(estimation==="10.2"){
                return "17-5";
            }
            else{
                return "17-6";
            }
        }
        else if(secteur==="Carrelages – Revêtements"){
            if(estimation==="0.51"){
                return "18-2";
            }
            else if(estimation==="2.55"){
                return "18-3";
            }
            else if(estimation==="5.1"){
                return "18-4";
            }
            else if(estimation==="10.2"){
                return "18-5";
            }
            else{
                return "18-6";
            }
        }
        else if(secteur==="Plâtrerie"){
            if(estimation==="0.51"){
                return "19-2";
            }
            else if(estimation==="2.55"){
                return "19-3";
            }
            else if(estimation==="5.1"){
                return "19-4";
            }
            else if(estimation==="10.2"){
                return "19-5";
            }
            else{
                return "19-6";
            }
        }
        else if(secteur==="Construction en matériaux locaux"){
            if(estimation==="0.51"){
                return "20-2";
            }
            else if(estimation==="1.53"){
                return "20-3";
            }
            else if(estimation==="2.55"){
                return "20-4";
            }
            else if(estimation==="5.1"){
                return "20-5";
            }
            else{
                return "20-6";
            }
        }
        else if(secteur==="Equipement intérieur - Décoration"){
            if(estimation==="0.51"){
                return "21-2";
            }
            else if(estimation==="1.53"){
                return "21-3";
            }
            else if(estimation==="2.55"){
                return "21-4";
            }
            else if(estimation==="5.1"){
                return "21-5";
            }
            else{
                return "21-6";
            }
        }
        else if(secteur==="Isolation frigorifique et chambres froides"){
            if(estimation==="0.51"){
                return "22-2";
            }
            else if(estimation==="2.55"){
                return "22-3";
            }
            else if(estimation==="5.1"){
                return "22-4";
            }
            else if(estimation==="10.2"){
                return "22-5";
            }
            else{
                return "22-6";
            }
        }
        else if(secteur==="Professions Artisanales"){
            if(estimation==="0.51"){
                return "23-2";
            }
            else if(estimation==="2.55"){
                return "23-3";
            }
            else if(estimation==="5.1"){
                return "23-4";
            }
            else if(estimation==="10.2"){
                return "23-5";
            }
            else{
                return "23-6";
            }
        }
        else if(secteur==="Réhabilitation de bâtiments anciens"){
            if(estimation==="0.51"){
                return "24-2";
            }
            else if(estimation==="2.55"){
                return "24-3";
            }
            else if(estimation==="5.1"){
                return "24-4";
            }
            else if(estimation==="10.2"){
                return "24-5";
            }
            else{
                return "24-6";
            }
        }
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