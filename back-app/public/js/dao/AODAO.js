// aoDAO.js
const pool = require('./db');

class AODAO {
  static async create(ao) {
    const _query = `
      INSERT INTO AO (num, etat, dateOuverturePlis, heureOuverturePlis, datePublicationPortail, dateEntreDM, dateAchevementTravauxCommission, avis, numEB, numLettreCommission)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      ao.num,
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

  static async update(ao) {
    const _query = `
      UPDATE AO
      SET etat=?, dateOuverturePlis=?, heureOuverturePlis=?, datePublicationPortail=?, dateEntreDM=?, dateAchevementTravauxCommission=?, avis=?, numEB=?, numLettreCommission=?
      WHERE num=?
    `;

    const values = [
      ao.etat,
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
      return new AO(...Object.values(rows[0]));
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getAll() {
    const _query = 'SELECT * FROM AO';

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

      return rows.map((row) => new AO(...Object.values(row)));
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

module.exports=AODAO;