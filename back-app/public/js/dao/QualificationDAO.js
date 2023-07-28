// qualificationDAO.js

import { query as _query } from './db';

class QualificationDAO {
  static create(qualification) {
    const query = `
      INSERT INTO Qualification (qualification, numSecteur)
      VALUES (?, ?)
    `;

    const values = [qualification.qualification, qualification.numSecteur];

    return new Promise((resolve, reject) => {
      _query(query, values, (err, result) => {
        if (err) reject(err);
        resolve(result.insertId);
      });
    });
  }

  static update(qualification) {
    const query = `
      UPDATE Qualification
      SET qualification=?, numSecteur=?
      WHERE num=?
    `;

    const values = [qualification.qualification, qualification.numSecteur, qualification.num];

    return new Promise((resolve, reject) => {
      _query(query, values, (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static delete(num) {
    const query = 'DELETE FROM Qualification WHERE num=?';

    return new Promise((resolve, reject) => {
      _query(query, [num], (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static getByNum(num) {
    const query = 'SELECT * FROM Qualification WHERE num=?';

    return new Promise((resolve, reject) => {
      _query(query, [num], (err, rows) => {
        if (err) reject(err);
        if (rows.length === 0) resolve(null);
        const qualification = new Qualification(...Object.values(rows[0]));
        resolve(qualification);
      });
    });
  }

  static getAll() {
    const query = 'SELECT * FROM Qualification';

    return new Promise((resolve, reject) => {
      _query(query, (err, rows) => {
        if (err) reject(err);
        const qualificationList = rows.map((row) => new Qualification(...Object.values(row)));
        resolve(qualificationList);
      });
    });
  }
}

export default QualificationDAO;
