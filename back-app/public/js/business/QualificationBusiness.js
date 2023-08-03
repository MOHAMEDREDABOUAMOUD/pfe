const QualificationDAO = require("../dao/QualificationDAO");

class QualificationBusiness {
    static Add(qualification) {
        return QualificationDAO.create(qualification);
    }

    static update(qualification) {
        return QualificationDAO.update(qualification);
    }

    static delete(num) {
        return QualificationDAO.delete(num);
    }

    static searchByNum(num) {
        return QualificationDAO.getByNum(num);
    }

    static getAll() {
        return QualificationDAO.getAll();
    }
}
module.exports=QualificationBusiness;
