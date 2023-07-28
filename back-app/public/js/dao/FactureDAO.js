// factureDAO.js

import { query as _query } from './db';

class FactureDAO {
  static create(facture) {
    const query = `
      INSERT INTO Facture (dateFacture, montant, numJournal)
      VALUES (?, ?, ?)
    `;

    const values = [facture.dateFacture, facture.montant, facture.numJournal];

    return new Promise((resolve, reject) => {
      _query(query, values, (err, result) => {
        if (err) reject(err);
        resolve(result.insertId);
      });
    });
  }

  static update(facture) {
    const query = `
      UPDATE Facture
      SET dateFacture=?, montant=?, numJournal=?
      WHERE num=?
    `;

    const values = [facture.dateFacture, facture.montant, facture.numJournal, facture.num];

    return new Promise((resolve, reject) => {
      _query(query, values, (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static delete(num) {
    const query = 'DELETE FROM Facture WHERE num=?';

    return new Promise((resolve, reject) => {
      _query(query, [num], (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static getByNum(num) {
    const query = 'SELECT * FROM Facture WHERE num=?';

    return new Promise((resolve, reject) => {
      _query(query, [num], (err, rows) => {
        if (err) reject(err);
        if (rows.length === 0) resolve(null);
        const facture = new Facture(...Object.values(rows[0]));
        resolve(facture);
      });
    });
  }

  static getAll() {
    const query = 'SELECT * FROM Facture';

    return new Promise((resolve, reject) => {
      _query(query, (err, rows) => {
        if (err) reject(err);
        const factureList = rows.map((row) => new Facture(...Object.values(row)));
        resolve(factureList);
      });
    });
  }
}

export default FactureDAO;
