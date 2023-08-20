const JournalDAO = require("../dao/JournalDAO");
class JournalBusiness {
    static Add(journal) {
        return JournalDAO.create(journal);
    }

    static update(journal) {
        return JournalDAO.update(journal);
    }

    static updateLettreJournal(piece, fileName, id){
        return JournalDAO.updateLettreJournal(piece, fileName, id);
    }

    static delete(num) {
        return JournalDAO.delete(num);
    }

    static searchByNum(num) {
        return JournalDAO.getByNum(num);
    }

    static getAll() {
        return JournalDAO.getAll();
    }

    static getByNumAO(num){
        return JournalDAO.getByNumAO(num);
    }
}
module.exports=JournalBusiness;