// operationDAO.js

import { query as _query } from './db';

class OperationDAO {
  static create(operation) {
    const query = `
      INSERT INTO Operation (code, agence, DA, imputation, natureProjet, operation, programme, situation, superficie, typeProjet, numEB)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      operation.code,
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

    return new Promise((resolve, reject) => {
      _query(query, values, (err, result) => {
        if (err) reject(err);
        resolve(result.insertId);
      });
    });
  }

  static update(operation) {
    const query = `
      UPDATE Operation
      SET code=?, agence=?, DA=?, imputation=?, natureProjet=?, operation=?, programme=?, situation=?, superficie=?, typeProjet=?, numEB=?
      WHERE code=?
    `;

    const values = [
      operation.code,
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

    return new Promise((resolve, reject) => {
      _query(query, values, (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static delete(code) {
    const query = 'DELETE FROM Operation WHERE code=?';

    return new Promise((resolve, reject) => {
      _query(query, [code], (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static getByCode(code) {
    const query = 'SELECT * FROM Operation WHERE code=?';

    return new Promise((resolve, reject) => {
      _query(query, [code], (err, rows) => {
        if (err) reject(err);
        if (rows.length === 0) resolve(null);
        const operation = new Operation(...Object.values(rows[0]));
        resolve(operation);
      });
    });
  }

  static getAll() {
    const query = 'SELECT * FROM Operation';

    return new Promise((resolve, reject) => {
      _query(query, (err, rows) => {
        if (err) reject(err);
        const operationList = rows.map((row) => new Operation(...Object.values(row)));
        resolve(operationList);
      });
    });
  }
}

export default OperationDAO;
