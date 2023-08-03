// secteurDAO.js


const pool = require('./db');
class SecteurDAO {
  static async create(secteur) {
    const _query = `
      INSERT INTO Secteur (secteur)
      VALUES (?)
    `;
  
    const values = [secteur.secteur];
  
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
  

  static async update(secteur) {
    const _query = `
      UPDATE Secteur
      SET secteur=?
      WHERE num=?
    `;
  
    const values = [secteur.secteur, secteur.num];
  
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
    const _query = 'DELETE FROM Secteur WHERE num=?';
  
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
    const _query = 'SELECT * FROM Secteur WHERE num=?';
  
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
  
      if (rows.length === 0) {
        return null;
      }
  
      const secteur = new Secteur(...Object.values(rows[0]));
      return secteur;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  

  static async getAll() {
    const _query = 'SELECT * FROM Secteur';
  
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
  
      const secteurList = rows.map((row) => new Secteur(...Object.values(row)));
      return secteurList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
}
module.exports=SecteurDAO;