// journalDAO.js
const pool = require('./db');

class JournalDAO {
  static create(journal) {
    const _query = `
      INSERT INTO Journal (numEnvoie, format, fournisseur, dateEnvoie, datePublication, lettreJournal, numAo)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      journal.numEnvoie,
      journal.format,
      journal.fournisseur,
      journal.dateEnvoie,
      journal.datePublication,
      journal.lettreJournal,
      journal.numAo,
    ];

    return new Promise((resolve, reject) => {
      pool.query(_query, values, (err, result) => {
        if (err) reject(err);
        resolve(result.insertId);
      });
    });
  }

  static update(journal) {
    const _query = `
      UPDATE Journal
      SET numEnvoie=?, format=?, fournisseur=?, dateEnvoie=?, datePublication=?, lettreJournal=?, numAo=?
      WHERE num=?
    `;

    const values = [
      journal.numEnvoie,
      journal.format,
      journal.fournisseur,
      journal.dateEnvoie,
      journal.datePublication,
      journal.lettreJournal,
      journal.numAo,
      journal.num, // Assuming you have a property named 'num' to store the primary key value
    ];

    return new Promise((resolve, reject) => {
      pool.query(_query, values, (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static delete(num) {
    const _query = 'DELETE FROM Journal WHERE num=?';

    return new Promise((resolve, reject) => {
      pool.query(_query, [num], (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static getByNum(num) {
    const _query = 'SELECT * FROM Journal WHERE num=?';

    return new Promise((resolve, reject) => {
      pool.query(_query, [num], (err, rows) => {
        if (err) reject(err);
        if (rows.length === 0) resolve(null);
        const journal = new Journal(...Object.values(rows[0]));
        resolve(journal);
      });
    });
  }

  static getAll() {
    const _query = 'SELECT * FROM Journal';

    return new Promise((resolve, reject) => {
      pool.query(_query, (err, rows) => {
        if (err) reject(err);
        const journalList = rows.map((row) => new Journal(...Object.values(row)));
        resolve(journalList);
      });
    });
  }
}
module.exports=JournalDAO;