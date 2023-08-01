// lettreCommissionDAO.js

import { query as _query } from './db';

class LettreCommissionDAO {
  static create(lettreCommission) {
    const query = `
      INSERT INTO LettreCommission (numEnvoie, dateEnvoie, destinataire, lettreCommission)
      VALUES (?, ?, ?, ?)
    `;

    const values = [lettreCommission.numEnvoie, lettreCommission.dateEnvoie, lettreCommission.destinataire, lettreCommission.lettreCommission];

    return new Promise((resolve, reject) => {
      _query(query, values, (err, result) => {
        if (err) reject(err);
        resolve(result.insertId);
      });
    });
  }

  static update(lettreCommission) {
    const query = `
      UPDATE LettreCommission
      SET numEnvoie=?, dateEnvoie=?, destinataire=?, lettreCommission=?
      WHERE num=?
    `;

    const values = [lettreCommission.numEnvoie, lettreCommission.dateEnvoie, lettreCommission.destinataire, lettreCommission.lettreCommission, lettreCommission.num];

    return new Promise((resolve, reject) => {
      _query(query, values, (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static delete(num) {
    const query = 'DELETE FROM LettreCommission WHERE num=?';

    return new Promise((resolve, reject) => {
      _query(query, [num], (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static getByNum(num) {
    const query = 'SELECT * FROM LettreCommission WHERE num=?';

    return new Promise((resolve, reject) => {
      _query(query, [num], (err, rows) => {
        if (err) reject(err);
        if (rows.length === 0) resolve(null);
        const lettreCommission = new LettreCommission(...Object.values(rows[0]));
        resolve(lettreCommission);
      });
    });
  }

  static getAll() {
    const query = 'SELECT * FROM LettreCommission';

    return new Promise((resolve, reject) => {
      _query(query, (err, rows) => {
        if (err) reject(err);
        const lettreCommissionList = rows.map((row) => new LettreCommission(...Object.values(row)));
        resolve(lettreCommissionList);
      });
    });
  }
}

export default LettreCommissionDAO;
