const PieceDAO = require("../dao/PieceDAO");
class PieceBusiness {
    static Add(piece) {
        return PieceDAO.create(piece);
    }

    static update(piece) {
        return PieceDAO.update(piece);
    }

    static delete(num) {
        return PieceDAO.delete(num);
    }

    static searchByNum(num) {
        return PieceDAO.getByNum(num);
    }

    static searchByEBNum(id){
        return PieceDAO.getbyEBNum(id);
    }

    static getPiece(id){
        return PieceDAO.getPiece(id);
    }

    static getAll() {
        return PieceDAO.getAll();
    }
}
module.exports=PieceBusiness;