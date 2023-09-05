// pieceDAO.js


const Piece = require('../models/Piece');
const pool = require('./db');
class PieceDAO {

  static async addDefaultPiece(name, file){
    const _query = `
      INSERT INTO defaultPiece (name, piece)
      VALUES (?, ?)
    `;
  
    const values = [name, file];
  
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

  static async deleteDefaultPiece(name){
    const _query = `
      DELETE FROM defaultPiece WHERE name=?
    `;
  
    const values = [name];
  
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

  static async create(piece) {
    const _query = `
      INSERT INTO Piece (libelle, piece, base64, fileName, numEB)
      VALUES (?, ?, ?, ?, ?)
    `;
  
    const values = [piece.libelle, piece.piece, piece.base64, piece.fileName, piece.numEB];
    //console.log(piece.piece);
  
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
  
  static async updatePiece(piece, fileName, id){
    const _query = `
      UPDATE Piece
      SET piece=?, fileName=?
      WHERE num=?
    `;

    const values = [piece, fileName, id];

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
  
  static async deleteWithNum(num) {
    const _query = 'DELETE FROM Piece WHERE numEB=?';

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
      return new Piece(JSON.parse(JSON.stringify(rows[0])));
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getPiece(id){
    const _query = 'SELECT * FROM Piece WHERE num=?';

    try {
      const rows = await new Promise((resolve, reject) => {
        pool.query(_query, [id], (err, rows) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });

      if (rows.length === 0) return null;
      //console.log(rows[0]);
      return new Piece(JSON.parse(JSON.stringify(rows[0])));
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getbyEBNum(id){
    const _query = 'SELECT * FROM Piece WHERE numEB=?';

    try {
      const rows = await new Promise((resolve, reject) => {
        pool.query(_query, [id], (err, rows) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });

      if (rows.length === 0) return null;
      const filesList = rows.map((file) => {
        return JSON.parse(JSON.stringify(file));
      });
      return filesList;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getDPs(){
    const _query = 'SELECT * FROM defaultPiece';

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

      const filesList = rows.map((file) => {
        return JSON.parse(JSON.stringify(file));
      });
      return filesList;
    } catch (error) {
      console.error(error);
      return [];
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

      const filesList = rows.map((file) => {
        return JSON.parse(JSON.stringify(file));
      });
      return filesList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

module.exports = PieceDAO;