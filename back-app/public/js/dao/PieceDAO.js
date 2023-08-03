// pieceDAO.js


const pool = require('./db');
class PieceDAO {
  static async create(piece) {
    const _query = `
      INSERT INTO Piece (libelle, piece, numEB)
      VALUES (?, ?, ?)
    `;

    const values = [piece.libelle, piece.piece, piece.numEB];

    try {
      const result = await new Promise((resolve, reject) => {
        pool.query(_query, values, (err, result) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      return result.insertId;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async update(piece) {
    const _query = `
      UPDATE Piece
      SET libelle=?, piece=?, numEB=?
      WHERE num=?
    `;

    const values = [piece.libelle, piece.piece, piece.numEB, piece.num];

    try {
      const result = await new Promise((resolve, reject) => {
        pool.query(_query, values, (err, result) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      return result.affectedRows;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async delete(num) {
    const _query = 'DELETE FROM Piece WHERE num=?';

    try {
      const result = await new Promise((resolve, reject) => {
        pool.query(_query, [num], (err, result) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      return result.affectedRows;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getByNum(num) {
    const _query = 'SELECT * FROM Piece WHERE num=?';

    try {
      const rows = await new Promise((resolve, reject) => {
        pool.query(_query, [num], (err, rows) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });

      if (rows.length === 0) return null;
      return new Piece(...Object.values(rows[0]));
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getAll() {
    const _query = 'SELECT * FROM Piece';

    try {
      const rows = await new Promise((resolve, reject) => {
        pool.query(_query, (err, rows) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });

      return rows.map((row) => new Piece(...Object.values(row)));
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

module.exports=PieceDAO;