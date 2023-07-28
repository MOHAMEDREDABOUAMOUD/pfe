// aoDAO.js

import { query as _query } from './db';

class AODAO {
  static create(ao) {
    const query = `
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

    return new Promise((resolve, reject) => {
      _query(query, values, (err, result) => {
        if (err) reject(err);
        resolve(result.insertId);
      });
    });
  }

  static update(ao) {
    const query = `
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

    return new Promise((resolve, reject) => {
      _query(query, values, (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static delete(num) {
    const query = 'DELETE FROM AO WHERE num=?';

    return new Promise((resolve, reject) => {
      _query(query, [num], (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static getByNum(num) {
    const query = 'SELECT * FROM AO WHERE num=?';

    return new Promise((resolve, reject) => {
      _query(query, [num], (err, rows) => {
        if (err) reject(err);
        if (rows.length === 0) resolve(null);
        const ao = new AO(...Object.values(rows[0]));
        resolve(ao);
      });
    });
  }

  static getAll() {
    const query = 'SELECT * FROM AO';

    return new Promise((resolve, reject) => {
      _query(query, (err, rows) => {
        if (err) reject(err);
        const aoList = rows.map((row) => new AO(...Object.values(row)));
        resolve(aoList);
      });
    });
  }
}

export default AODAO;
