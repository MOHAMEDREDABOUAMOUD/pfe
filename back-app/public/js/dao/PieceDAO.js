// pieceDAO.js

import { query as _query } from './db';

class PieceDAO {
  static create(piece) {
    const query = `
      INSERT INTO Piece (libelle, piece, numEB)
      VALUES (?, ?, ?)
    `;

    const values = [piece.libelle, piece.piece, piece.numEB];

    return new Promise((resolve, reject) => {
      _query(query, values, (err, result) => {
        if (err) reject(err);
        resolve(result.insertId);
      });
    });
  }

  static update(piece) {
    const query = `
      UPDATE Piece
      SET libelle=?, piece=?, numEB=?
      WHERE num=?
    `;

    const values = [piece.libelle, piece.piece, piece.numEB, piece.num];

    return new Promise((resolve, reject) => {
      _query(query, values, (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static delete(num) {
    const query = 'DELETE FROM Piece WHERE num=?';

    return new Promise((resolve, reject) => {
      _query(query, [num], (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static getByNum(num) {
    const query = 'SELECT * FROM Piece WHERE num=?';

    return new Promise((resolve, reject) => {
      _query(query, [num], (err, rows) => {
        if (err) reject(err);
        if (rows.length === 0) resolve(null);
        const piece = new Piece(...Object.values(rows[0]));
        resolve(piece);
      });
    });
  }

  static getAll() {
    const query = 'SELECT * FROM Piece';

    return new Promise((resolve, reject) => {
      _query(query, (err, rows) => {
        if (err) reject(err);
        const pieceList = rows.map((row) => new Piece(...Object.values(row)));
        resolve(pieceList);
      });
    });
  }
}

export default PieceDAO;
