// utilisateurDAO.js

const Utilisateur = require('../models/Utilisateur');
const pool = require('./db');
// const { createPool } = require('mysql');

// // Create the database connection pool
// const pool = createPool({
//     host: '127.0.0.1',
//     port: '3306',
//     database: 'pfe',
//     user: 'root',
//     password: ''
// });

class UtilisateurDAO {
  static async create(user) {
    const _query = `
      INSERT INTO Utilisateur (immatricule, login, pwd, nom, prenom, email, fonction, sexe)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [user.immatricule, user.login, user.pwd, user.nom, user.prenom, user.email, user.fonction, user.sexe];

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

  static async update(user) {
    const _query = `
      UPDATE Utilisateur
      SET login=?, pwd=?, nom=?, prenom=?, email=?, fonction=?, sexe=?
      WHERE immatricule=?
    `;

    const values = [user.login, user.pwd, user.nom, user.prenom, user.email, user.fonction, user.sexe, user.immatricule];

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

  static async updateIP(user) {
    const _query = `
      UPDATE Utilisateur
      SET nom=?, prenom=?, email=?
      WHERE immatricule=?
    `;

    const values = [user.nom, user.prenom, user.email, user.immatricule];

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

  static async updateS(user) {
    const _query = `
      UPDATE Utilisateur
      SET login=?, pwd=?
      WHERE immatricule=?
    `;

    const values = [user.login, user.pwd, user.immatricule];

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


  static async delete(immatricule) {
    const _query = 'DELETE FROM Utilisateur WHERE immatricule=?';

    try {
      const result = await new Promise((resolve, reject) => {
        pool.query(_query, [immatricule], (err, result) => {
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

  static async getByImmatricule(immatricule) {
    const _query = 'SELECT immatricule, email, nom, prenom, login , pwd , fonction, sexe FROM Utilisateur WHERE immatricule=?';

    try {
      const rows = await new Promise((resolve, reject) => {
        pool.query(_query, [immatricule], (err, rows) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });

      if (rows.length === 0) {
        return {};
      }

      const user = JSON.parse(JSON.stringify(rows[0]));
      //console.log(user);
      return user ? new Utilisateur(user) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }


  static async getByUserNameAndPassword(userName, password) {
    const _query = 'SELECT * FROM Utilisateur WHERE login=? and pwd=?';

    try {
      const rows = await new Promise((resolve, reject) => {
        pool.query(_query, [userName, password], (err, rows) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });

      if (rows.length === 0) {
        return {};
      }

      const user = JSON.parse(JSON.stringify(rows[0]));
      return user ? new Utilisateur(user) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getPassword(email){
    const _query = 'SELECT * FROM Utilisateur WHERE email=?';

    try {
      const rows = await new Promise((resolve, reject) => {
        pool.query(_query, [email], (err, rows) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });

      if (rows.length === 0) {
        return {};
      }

      const user = JSON.parse(JSON.stringify(rows[0]));
      return user ? new Utilisateur(user) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getAll() {
    const _query = 'SELECT immatricule, email, nom, prenom, login, pwd, fonction, sexe FROM Utilisateur';
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
      const userList = rows.map((user) => {
        // Convert the user object to plain JSON format
        return JSON.parse(JSON.stringify(user));
      });
      
      return userList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
// const user=UtilisateurDAO.getByUserNameAndPassword("1", "1111");
// console.log(user);
module.exports = UtilisateurDAO;