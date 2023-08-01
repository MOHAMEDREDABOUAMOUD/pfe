// utilisateurDAO.js

import { query as _query } from './db';

class UtilisateurDAO {
  static create(user) {
    const query = `
      INSERT INTO Utilisateur (name, username)
      VALUES (?, ?)
    `;

    const values = [user.name, user.username];

    return new Promise((resolve, reject) => {
      _query(query, values, (err, result) => {
        if (err) reject(err);
        resolve(result.insertId);
      });
    });
  }

  static update(user) {
    const query = `
      UPDATE Utilisateur
      SET name=?, username=?
      WHERE immatricule=?
    `;

    const values = [user.name, user.username, user.immatricule];

    return new Promise((resolve, reject) => {
      _query(query, values, (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static delete(immatricule) {
    const query = 'DELETE FROM Utilisateur WHERE immatricule=?';

    return new Promise((resolve, reject) => {
      _query(query, [immatricule], (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows);
      });
    });
  }

  static getByImmatricule(immatricule) {
    const query = 'SELECT * FROM Utilisateur WHERE immatricule=?';

    return new Promise((resolve, reject) => {
      _query(query, [immatricule], (err, rows) => {
        if (err) reject(err);
        if (rows.length === 0) resolve(null);
        const user = rows[0];
        resolve(user);
      });
    });
  }

  static getAll() {
    const query = 'SELECT * FROM Utilisateur';

    return new Promise((resolve, reject) => {
      _query(query, (err, rows) => {
        if (err) reject(err);
        const userList = rows.map((row) => row);
        resolve(userList);
      });
    });
  }
}

export default UtilisateurDAO;
