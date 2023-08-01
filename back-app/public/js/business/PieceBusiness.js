import PieceDAO from "../dao/PieceDAO";
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

    static getAll() {
        return PieceDAO.getAll();
    }
}
export default PieceBusiness;
