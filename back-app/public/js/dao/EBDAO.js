// ebDAO.js

const EB = require('../models/EB');
const OperationDAO = require('./OperationDAO');
const PieceDAO = require('./PieceDAO');
const pool = require('./db');

class EBDAO {
  static async create(eb) {
    const _query = `
      INSERT INTO EB (objet, agence, observation, prog_nonprog, classe, caution, estimation, dateEB, modePassation, dateValidation, validerPar, numUtilisateur, qualification, secteur)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      eb.qualification,
      eb.secteur,
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

  static async update(eb) {
    const _query = `
      UPDATE EB
      SET objet=?, agence=?, observation=?, prog_nonprog=?, classe=?, caution=?, estimation=?, dateEB=?, modePassation=?, dateValidation=?, validerPar=?, numUtilisateur=?, qualification=?, secteur=?
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
      eb.qualification,
      eb.secteur,
      eb.num, // Assuming you have a property named 'num' to store the primary key value
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
    const _query = 'DELETE FROM EB WHERE num=?';

    try {
      PieceDAO.deleteWithNum(num);
      OperationDAO.deleteWithNum(num);
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
    const _query = 'SELECT EB.num, EB.objet, EB.agence, EB.observation, EB.prog_nonprog, EB.classe, EB.qualification, EB.secteur, EB.caution, EB.estimation, EB.dateEB, EB.modePassation FROM EB WHERE EB.num=?';

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
      const eb = JSON.parse(JSON.stringify(rows[0]));
      return eb ? new EB(eb) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getByUserId(id) {
    const _query = 'SELECT EB.num, EB.objet, EB.agence, EB.observation, EB.prog_nonprog, EB.classe, EB.caution, EB.estimation, EB.dateEB, EB.modePassation, EB.qualification, EB.secteur FROM EB WHERE numUtilisateur=?';

    try {
      const rows = await new Promise((resolve, reject) => {
        pool.query(_query, [id], (err, rows) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });

      if (rows.length === 0) return null;
      const ebList = rows.map((eb) => {
        return JSON.parse(JSON.stringify(eb));
      });
      
      return ebList;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getAll() {
    const _query = 'SELECT * FROM EB';

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

      const ebList = rows.map((eb) => {
        // Convert the user object to plain JSON format
        return JSON.parse(JSON.stringify(eb));
      });
      
      return ebList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

module.exports=EBDAO;
