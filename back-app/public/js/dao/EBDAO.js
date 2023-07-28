// ebDAO.js

import { query as _query } from './db';

class EBDAO {
  static create(eb) {
    const query = `
      INSERT INTO EB (objet, agence, observation, prog_nonprog, classe, caution, estimation, dateEB, modePassation, dateValidation, validerPar, numUtilisateur, numQualification)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      eb.objet,
      eb.agence,
      eb.observation,
      eb.prog_nonprog,
      eb.classe,
      eb.caution,
      eb.estimation,
      eb.dateEB,
      eb.modePassation,
      eb.dateValidation,
      eb.validerPar,
      eb.numUtilisateur,
      eb.numQualification,
    ];

    return new Promise((resolve, reject) => {
      _query(query, values, (err, result) => {
        if (err) reject(err);
        resolve(result.insertId);
      });
    });
  }

  static update(eb) {
    const query = `
      UPDATE EB
      SET objet=?, agence=?, observation=?, prog_nonprog=?, classe=?, caution=?, estimation=?, dateEB=?, modePassation=?, dateValidation=?, validerPar=?, numUtilisateur=?, numQualification=?
      WHERE num=?
    `;

    const values = [
      eb.objet,
      eb.agence,
      eb.observation,
      eb.prog_nonprog,
      eb.classe,
      eb.caution,
      eb.estimation,
      eb.dateEB,
      eb.modePassation,
      eb.dateValidation,
      eb.validerPar,
      eb.numUtilisateur,
      eb.numQualification,
      eb.num, // Assuming you have a property named 'num' to store the primary key value
    ];

    return new Promise((resolve, reject) => {
      _query(query, values, (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static delete(num) {
    const query = 'DELETE FROM EB WHERE num=?';

    return new Promise((resolve, reject) => {
      _query(query, [num], (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static getByNum(num) {
    const query = 'SELECT * FROM EB WHERE num=?';

    return new Promise((resolve, reject) => {
      _query(query, [num], (err, rows) => {
        if (err) reject(err);
        if (rows.length === 0) resolve(null);
        const eb = new EB(...Object.values(rows[0]));
        resolve(eb);
      });
    });
  }

  static getAll() {
    const query = 'SELECT * FROM EB';

    return new Promise((resolve, reject) => {
      _query(query, (err, rows) => {
        if (err) reject(err);
        const ebList = rows.map((row) => new EB(...Object.values(row)));
        resolve(ebList);
      });
    });
  }
}

export default EBDAO;
