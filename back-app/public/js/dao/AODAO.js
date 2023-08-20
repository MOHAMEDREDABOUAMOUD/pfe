// aoDAO.js
const AO = require('../models/AO');
const pool = require('./db');

class AODAO {
  static async create(ao) {
    const _query = `
      INSERT INTO AO (num, fileName, etat, dateOuverturePlis, heureOuverturePlis, datePublicationPortail, dateEntreDM, dateAchevementTravauxCommission, avis, numEB, numLettreCommission)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      ao.num,
      ao.fileName,
      ao.etat,
      ao.dateOuverturePlis,
      ao.heureOuverturePlis,
      ao.datePublicationPortail,
      ao.dateEntreDM,
      ao.dateAchevementTravauxCommission,
      ao.avis,
      ao.numEB,
      ao.numLettreCommission,
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

  static async updateAvis(piece, fileName, id) {
    const _query = `
      UPDATE AO
      SET avis=?, fileName=?
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

  static async update(ao) {
    const _query = `
      UPDATE AO
      SET etat=?, fileName=?, dateOuverturePlis=?, heureOuverturePlis=?, datePublicationPortail=?, dateEntreDM=?, dateAchevementTravauxCommission=?, avis=?, numEB=?, numLettreCommission=?
      WHERE num=?
    `;

    const values = [
      ao.etat,
      ao.fileName,
      ao.dateOuverturePlis,
      ao.heureOuverturePlis,
      ao.datePublicationPortail,
      ao.dateEntreDM,
      ao.dateAchevementTravauxCommission,
      ao.avis,
      ao.numEB,
      ao.numLettreCommission,
      ao.num, // Assuming you have a property named 'num' to store the primary key value
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
    const _query = 'DELETE FROM AO WHERE num=?';

    try {
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
    const _query = 'SELECT * FROM AO WHERE num=?';

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
      const ao = JSON.parse(JSON.stringify(rows[0]));
      return eb ? new AO(ao) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getByUserId(currentUser) {
    const _query = 'SELECT AO.num, AO.etat, AO.dateOuverturePlis, AO.heureOuverturePlis, AO.datePublicationPortail, AO.dateEntreDM, AO.dateAchevementTravauxCommission, AO.avis, AO.numEB, AO.numLettreCommission, AO.fileName FROM AO inner join EB on AO.numEB=EB.num where EB.numUtilisateur=?';

    try {
      const rows = await new Promise((resolve, reject) => {
        pool.query(_query, [currentUser], (err, rows) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });

      const aoList = rows.map((ao) => {
        return JSON.parse(JSON.stringify(ao));
      });

      return aoList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getAll() {
    const _query = 'SELECT * FROM AO where num not in (select numAO from marche)';

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

      const aoList = rows.map((ao) => {
        return JSON.parse(JSON.stringify(ao));
      });

      return aoList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

module.exports = AODAO;