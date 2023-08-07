// operationDAO.js

const pool = require('./db');

class OperationDAO {
  static async create(operation) {
    const _query = `
      INSERT INTO Operation (agence, DA, imputation, natureProjet, operation, programme, situation, superficie, typeProjet, numEB)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      operation.agence,
      operation.DA,
      operation.imputation,
      operation.natureProjet,
      operation.operation,
      operation.programme,
      operation.situation,
      operation.superficie,
      operation.typeProjet,
      operation.numEB,
    ];

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

  static async update(operation) {
    const _query = `
      UPDATE Operation
      SET agence=?, DA=?, imputation=?, natureProjet=?, operation=?, programme=?, situation=?, superficie=?, typeProjet=?, numEB=?
      WHERE code=?
    `;

    const values = [
      operation.agence,
      operation.DA,
      operation.imputation,
      operation.natureProjet,
      operation.operation,
      operation.programme,
      operation.situation,
      operation.superficie,
      operation.typeProjet,
      operation.numEB,
      operation.code, // Assuming you have a property named 'code' to store the primary key value
    ];

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

  static async delete(code) {
    const _query = 'DELETE FROM Operation WHERE code=?';

    try {
      const result = await new Promise((resolve, reject) => {
        pool.query(_query, [code], (err, result) => {
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

  static async getByCode(code) {
    const _query = 'SELECT * FROM Operation WHERE code=?';

    try {
      const rows = await new Promise((resolve, reject) => {
        pool.query(_query, [code], (err, rows) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });

      if (rows.length === 0) return null;
      return new Operation(...Object.values(rows[0]));
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getAll() {
    const _query = 'SELECT * FROM Operation';

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

      return rows.map((row) => new Operation(...Object.values(row)));
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

module.exports=OperationDAO;