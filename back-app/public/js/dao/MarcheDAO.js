// marcheDAO.js

import { query as _query } from './db';

class MarcheDAO {
  static create(marche) {
    const query = `
      INSERT INTO Marche (num, numCommande, marche, numAO)
      VALUES (?, ?, ?, ?)
    `;

    const values = [marche.num, marche.numCommande, marche.marche, marche.numAO];

    return new Promise((resolve, reject) => {
      _query(query, values, (err, result) => {
        if (err) reject(err);
        resolve(result.insertId);
      });
    });
  }

  static update(marche) {
    const query = `
      UPDATE Marche
      SET numCommande=?, marche=?, numAO=?
      WHERE num=?
    `;

    const values = [marche.numCommande, marche.marche, marche.numAO, marche.num];

    return new Promise((resolve, reject) => {
      _query(query, values, (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static delete(num) {
    const query = 'DELETE FROM Marche WHERE num=?';

    return new Promise((resolve, reject) => {
      _query(query, [num], (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static getByNum(num) {
    const query = 'SELECT * FROM Marche WHERE num=?';

    return new Promise((resolve, reject) => {
      _query(query, [num], (err, rows) => {
        if (err) reject(err);
        if (rows.length === 0) resolve(null);
        const marche = new Marche(...Object.values(rows[0]));
        resolve(marche);
      });
    });
  }

  static getAll() {
    const query = 'SELECT * FROM Marche';

    return new Promise((resolve, reject) => {
      _query(query, (err, rows) => {
        if (err) reject(err);
        const marcheList = rows.map((row) => new Marche(...Object.values(row)));
        resolve(marcheList);
      });
    });
  }
}

export default MarcheDAO;
