// secteurDAO.js

import { query as _query } from './db';

class SecteurDAO {
  static create(secteur) {
    const query = `
      INSERT INTO Secteur (secteur)
      VALUES (?)
    `;

    const values = [secteur.secteur];

    return new Promise((resolve, reject) => {
      _query(query, values, (err, result) => {
        if (err) reject(err);
        resolve(result.insertId);
      });
    });
  }

  static update(secteur) {
    const query = `
      UPDATE Secteur
      SET secteur=?
      WHERE num=?
    `;

    const values = [secteur.secteur, secteur.num];

    return new Promise((resolve, reject) => {
      _query(query, values, (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static delete(num) {
    const query = 'DELETE FROM Secteur WHERE num=?';

    return new Promise((resolve, reject) => {
      _query(query, [num], (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static getByNum(num) {
    const query = 'SELECT * FROM Secteur WHERE num=?';

    return new Promise((resolve, reject) => {
      _query(query, [num], (err, rows) => {
        if (err) reject(err);
        if (rows.length === 0) resolve(null);
        const secteur = new Secteur(...Object.values(rows[0]));
        resolve(secteur);
      });
    });
  }

  static getAll() {
    const query = 'SELECT * FROM Secteur';

    return new Promise((resolve, reject) => {
      _query(query, (err, rows) => {
        if (err) reject(err);
        const secteurList = rows.map((row) => new Secteur(...Object.values(row)));
        resolve(secteurList);
      });
    });
  }
}

export default SecteurDAO;
