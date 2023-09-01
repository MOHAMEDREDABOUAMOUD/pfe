const UtilisateurDAO = require("../dao/UtilisateurDAO");
const AOBusiness = require("./AOBusiness");
const EBBusiness = require("./EBBusiness");

class UtilisateurBusiness {
    static Add(utilisateur) {
        return UtilisateurDAO.create(utilisateur);
    }

    static update(utilisateur) {
        return UtilisateurDAO.update(utilisateur);
    }

    static updateIP(utilisateur) {
        return UtilisateurDAO.updateIP(utilisateur);
    }
    
    static updateS(utilisateur) {
        return UtilisateurDAO.updateS(utilisateur);
    }

    static delete(num) {
        return UtilisateurDAO.delete(num);
    }

    static async searchByNum(num) {
        return await UtilisateurDAO.getByImmatricule(num);
    }

    static async getByUserNameAndPassword(userName, password){
        return await UtilisateurDAO.getByUserNameAndPassword(userName, password);
    }

    static async getPassword(email){
        return await UtilisateurDAO.getPassword(email);
    }

    static async getAll() {
        return await UtilisateurDAO.getAll();
    }
    
    static async getNotifications(currentUser){
        let notifications=[];
        const u = await UtilisateurDAO.getByImmatricule(currentUser);
        const fonction = u.fonction;
        //console.log(fonction);
        if(fonction==="Demandeur" || fonction==="Admin"){
            const eb=await EBBusiness.getByUserId2(currentUser);
            //console.log(eb.length);
            for (let i = 0; i < eb.length; i++) {
                //console.log(eb[i].dateValidation+" / "+EBBusiness.getCurrentDateInMySQLFormat());
                const ao=await AOBusiness.getByEBNum(eb[i].num);
                if(eb[i].dateValidation===EBBusiness.getCurrentDateInMySQLFormat()){
                    const user= await UtilisateurDAO.getByImmatricule(eb[i].validerPar);
                    if(user.fonction==="Dti"){
                        notifications.push("l'expression des besoins numero "+eb[i].num+" a ete valider dans la DTI par "+user.sexe+" "+user.nom+" "+user.prenom);
                    }    
                    else if(user.fonction==="DM"){
                        notifications.push("l'expression des besoins numero "+eb[i].num+" a ete valider dans la DM par "+user.sexe+" "+user.nom+" "+user.prenom+" ,et donc ca devient un appel d'offre avec un numero : "+ao.num);
                    }
                }
                if (ao!=null){
                    //console.log("enter ao");
                    //console.log(ao.dateOuverturePlis+" / "+ao.datePublicationPortail+" / "+EBBusiness.getCurrentDateInMySQLFormat());
                    if(ao.dateOuverturePlis===EBBusiness.getCurrentDateInMySQLFormat()){
                        //console.log("enter ouvertureplis");
                        notifications.push("Aujourd'hui l'ouverture du plis de l'AO numero : "+ao.num+" a "+ao.heureOuverturePlis);
                    }
                    if(ao.datePublicationPortail===EBBusiness.getCurrentDateInMySQLFormat()){
                        //console.log("enter pp");
                        notifications.push("Aujourd'hui la publication portail de l'AO numero : "+ao.num);
                    }
                }
            }
            //console.log(notifications);
        }
        else if(fonction==="DTI"){
            const eb=await EBBusiness.getAll2(currentUser);
            for (let i = 0; i < eb.length; i++) {
                const ao=await AOBusiness.getByEBNum(eb[i].num);
                if(eb[i].dateValidation===EBBusiness.getCurrentDateInMySQLFormat()){
                    const user= await UtilisateurDAO.getByImmatricule(eb[i].validerPar);
                    if(user.fonction==="CM"){
                        notifications.push("l'expression des besoins numero "+eb[i].num+" a ete valider par "+user.sexe+" "+user.nom+" "+user.prenom);
                    }    
                    else if(user.fonction==="DM"){
                        notifications.push("l'expression des besoins numero "+eb[i].num+" a ete valider dans la DM par "+user.sexe+" "+user.nom+" "+user.prenom+" ,et donc ca devient un appel d'offre avec un numero : "+ao.num);
                    }
                }
                if (ao!=null){
                    if(ao.dateOuverturePlis===EBBusiness.getCurrentDateInMySQLFormat()){
                        notifications.push("Aujourd'hui l'ouverture du plis de l'AO numero : "+ao.num+" a "+ao.heureOuverturePlis);
                    }
                    if(ao.datePublicationPortail===EBBusiness.getCurrentDateInMySQLFormat()){
                        notifications.push("Aujourd'hui la publication portail de l'AO numero : "+ao.num);
                    }
                }
            }
            //console.log(notifications);
        }
        else if(fonction==="CM"){
            const eb=await EBBusiness.getDem2(currentUser);
            for (let i = 0; i < eb.length; i++) {
                const ao=await AOBusiness.getByEBNum(eb[i].num);
                if(eb[i].dateValidation===EBBusiness.getCurrentDateInMySQLFormat()){
                    const user= await UtilisateurDAO.getByImmatricule(eb[i].validerPar);
                    if(user.fonction==="DM"){
                        notifications.push("l'expression des besoins numero "+eb[i].num+" a ete valider dans la DM par "+user.sexe+" "+user.nom+" "+user.prenom+" ,et donc ca devient un appel d'offre avec un numero : "+ao.num);
                    }
                }
                if (ao!=null){
                    if(ao.dateOuverturePlis===EBBusiness.getCurrentDateInMySQLFormat()){
                        notifications.push("Aujourd'hui l'ouverture du plis de l'AO numero : "+ao.num+" a "+ao.heureOuverturePlis);
                    }
                    if(ao.datePublicationPortail===EBBusiness.getCurrentDateInMySQLFormat()){
                        notifications.push("Aujourd'hui la publication portail de l'AO numero : "+ao.num);
                    }
                }
                //console.log(notifications);
            }
        }
        else if(fonction==="DM"){
            const eb=await EBBusiness.getForDM2(currentUser);
            for (let i = 0; i < eb.length; i++) {
                const ao=await AOBusiness.getByEBNum(eb[i].num);
                if (ao!=null){
                    if(ao.dateOuverturePlis===EBBusiness.getCurrentDateInMySQLFormat()){
                        notifications.push("Aujourd'hui l'ouverture du plis de l'AO numero : "+ao.num+" a "+ao.heureOuverturePlis);
                    }
                    if(ao.datePublicationPortail===EBBusiness.getCurrentDateInMySQLFormat()){
                        notifications.push("Aujourd'hui la publication portail de l'AO numero : "+ao.num);
                    }
                }
            }
            //console.log(notifications);
        }
        return notifications;
    }
}
module.exports=UtilisateurBusiness;