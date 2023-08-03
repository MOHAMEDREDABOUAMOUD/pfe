// marcheDAO.js

const pool = require('./db');

class MarcheDAO {
  static async create(marche) {
    const _query = `
      INSERT INTO Marche (num, numCommande, marche, numAO)
      VALUES (?, ?, ?, ?)
    `;

    const values = [marche.num, marche.numCommande, marche.marche, marche.numAO];

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

  static async update(marche) {
    const _query = `
      UPDATE Marche
      SET numCommande=?, marche=?, numAO=?
      WHERE num=?
    `;

    const values = [marche.numCommande, marche.marche, marche.numAO, marche.num];

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
    const _query = 'DELETE FROM Marche WHERE num=?';

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
    const _query = 'SELECT * FROM Marche WHERE num=?';

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
      return new Marche(...Object.values(rows[0]));
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getAll() {
    const _query = 'SELECT * FROM Marche';

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

      return rows.map((row) => new Marche(...Object.values(row)));
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

module.exports = MarcheDAO;