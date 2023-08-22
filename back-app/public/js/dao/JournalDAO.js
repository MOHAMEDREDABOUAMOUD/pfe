// journalDAO.js
const Journal = require('../models/Journal');
const pool = require('./db');

class JournalDAO {
  static async create(journal) {
    const _query = `
      INSERT INTO Journal (numEnvoie, fileName, format, fournisseur, dateEnvoie, datePublication, lettreJournal, numAo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      journal.numEnvoie,
      journal.fileName,
      journal.format,
      journal.fournisseur,
      journal.dateEnvoie,
      journal.datePublication,
      journal.lettreJournal,
      journal.numAo,
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

  static async updateLettreJournal(piece, fileName, id){
    const _query = `
      UPDATE Journal
      SET lettreJournal=?, fileName=?
      WHERE num=?
    `;

    const values = [
      piece,
      fileName,
      id // Assuming you have a property named 'num' to store the primary key value
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

  static async update(journal) {
    const _query = `
      UPDATE Journal
      SET numEnvoie=?, format=?, fournisseur=?, dateEnvoie=?, datePublication=?
      WHERE num=?
    `;

    const values = [
      journal.numEnvoie,
      journal.format,
      journal.fournisseur,
      journal.dateEnvoie,
      journal.datePublication,
      journal.num, // Assuming you have a property named 'num' to store the primary key value
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

  static async delete(num) {
    const _query = 'DELETE FROM Journal WHERE num=?';

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

  static async getByNum(num) {
    const _query = 'SELECT * FROM Journal WHERE num=?';
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
      const j = JSON.parse(JSON.stringify(rows[0]));
      return j ? new Journal(j) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getAll() {
    const _query = 'SELECT * FROM Journal';

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
      const jList = rows.map((eb) => {
        return JSON.parse(JSON.stringify(eb));
      });
      return jList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getByNumAO(num){
    const _query = 'SELECT * FROM Journal where numAo=?';

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
      
      const jList = rows.map((eb) => {
        return JSON.parse(JSON.stringify(eb));
      });
      return jList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
module.exports=JournalDAO;