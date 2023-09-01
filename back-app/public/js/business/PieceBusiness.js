const PieceDAO = require("../dao/PieceDAO");
const fs = require('fs');
const mammoth = require('mammoth');
const Piece = require("../models/Piece");
class PieceBusiness {
    static Add(piece) {
        return PieceDAO.create(piece);
    }

    static update(piece) {
        return PieceDAO.update(piece);
    }

    static updatePiece(piece, fileName, id) {
        return PieceDAO.updatePiece(piece, fileName, id);
    }

    static delete(num) {
        return PieceDAO.delete(num);
    }

    static searchByNum(num) {
        return PieceDAO.getByNum(num);
    }

    static searchByEBNum(id) {
        return PieceDAO.getbyEBNum(id);
    }

    static async getPiece(id) {
        const piece = await PieceDAO.getPiece(id);
        let p=new Piece({num: piece.num, libelle: piece.libelle, piece: piece.piece, base64: "reda", fileName: piece.fileName, numEB: piece.numEB});;
        await this.decodeBase64Docx(piece.base64)
            .then((readableText) => {
                if (readableText) {
                    p=new Piece({num: piece.num, libelle: piece.libelle, piece: piece.piece, base64: readableText, fileName: piece.fileName, numEB: piece.numEB});
                    console.log(p);
                } else {
                    console.log('Failed to decode the DOCX content.');
                    p=new Piece({num: piece.num, libelle: piece.libelle, piece: piece.piece, base64: "reda", fileName: piece.fileName, numEB: piece.numEB});
                    console.log(p);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                p=new Piece({num: piece.num, libelle: piece.libelle, piece: piece.piece, base64: "reda", fileName: piece.fileName, numEB: piece.numEB});
                console.log(p);
            });
        return p;
    }

    static getAll() {
        return PieceDAO.getAll();
    }

    static async decodeBase64Docx(base64Content) {
        // Decode the Base64 content into a buffer
        const buffer = Buffer.from(base64Content, 'base64');

        // Use mammoth to convert the buffer to readable text
        try {
            const { value } = await mammoth.extractRawText({ buffer });
            return value;
        } catch (error) {
            console.error('Error converting DOCX:', error);
            return null;
        }
    }
}
module.exports = PieceBusiness;