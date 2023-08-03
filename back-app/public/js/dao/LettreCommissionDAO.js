// lettreCommissionDAO.js

const pool = require('./db');

class LettreCommissionDAO {
  static async create(lettreCommission) {
    const _query = `
      INSERT INTO LettreCommission (numEnvoie, dateEnvoie, destinataire, lettreCommission)
      VALUES (?, ?, ?, ?)
    `;

    const values = [lettreCommission.numEnvoie, lettreCommission.dateEnvoie, lettreCommission.destinataire, lettreCommission.lettreCommission];

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

  static async update(lettreCommission) {
    const _query = `
      UPDATE LettreCommission
      SET numEnvoie=?, dateEnvoie=?, destinataire=?, lettreCommission=?
      WHERE num=?
    `;

    const values = [lettreCommission.numEnvoie, lettreCommission.dateEnvoie, lettreCommission.destinataire, lettreCommission.lettreCommission, lettreCommission.num];

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
    const _query = 'DELETE FROM LettreCommission WHERE num=?';

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
    const _query = 'SELECT * FROM LettreCommission WHERE num=?';

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
      return new LettreCommission(...Object.values(rows[0]));
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getAll() {
    const _query = 'SELECT * FROM LettreCommission';

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

      return rows.map((row) => new LettreCommission(...Object.values(row)));
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

module.exports=LettreCommissionDAO;