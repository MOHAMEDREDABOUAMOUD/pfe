const JournalDAO = require("../dao/JournalDAO");
class JournalBusiness {
    static Add(journal) {
        return JournalDAO.create(journal);
    }

    static update(journal) {
        return JournalDAO.update(journal);
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
}
module.exports=JournalBusiness;