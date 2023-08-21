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
    const _query = 'SELECT EB.num, EB.objet, EB.agence, EB.observation, EB.prog_nonprog, EB.classe, EB.qualification, EB.secteur, EB.caution, EB.estimation, EB.dateEB, EB.modePassation, EB.numUtilisateur, EB.validerPar, EB.dateValidation FROM EB WHERE EB.num=?';
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
    const _query = 'SELECT EB.num, EB.objet, EB.agence, EB.observation, EB.prog_nonprog, EB.classe, EB.caution, EB.estimation, EB.dateEB, EB.modePassation, EB.qualification, EB.secteur, EB.validerPar, EB.numUtilisateur, EB.dateValidation FROM EB WHERE EB.numUtilisateur=? and EB.num not in (select numEB from AO)';
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
        // Assuming dateEB and dateValidation are in 'YYYY-MM-DD' format
        const dateEB = new Date(eb.dateEB);
        dateEB.setDate(dateEB.getDate() + 1);
        const modifiedDateEB = dateEB.toISOString().split('T')[0];
        
        const dateValidation = new Date(eb.dateValidation);
        dateValidation.setDate(dateValidation.getDate() + 1);
        const modifiedDateValidation = dateValidation.toISOString().split('T')[0];
        
        return {
          ...eb,
          dateEB: modifiedDateEB,
          dateValidation: modifiedDateValidation,
        };
      });

      return ebList;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getByUserId2(id) {
    const _query = 'SELECT EB.num, EB.objet, EB.agence, EB.observation, EB.prog_nonprog, EB.classe, EB.caution, EB.estimation, EB.dateEB, EB.modePassation, EB.qualification, EB.secteur, EB.validerPar, EB.numUtilisateur, EB.dateValidation FROM EB WHERE EB.numUtilisateur=?';
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
        // Assuming dateEB and dateValidation are in 'YYYY-MM-DD' format
        const dateEB = new Date(eb.dateEB);
        dateEB.setDate(dateEB.getDate() + 1);
        const modifiedDateEB = dateEB.toISOString().split('T')[0];
        
        const dateValidation = new Date(eb.dateValidation);
        dateValidation.setDate(dateValidation.getDate() + 1);
        const modifiedDateValidation = dateValidation.toISOString().split('T')[0];
        
        return {
          ...eb,
          dateEB: modifiedDateEB,
          dateValidation: modifiedDateValidation,
        };
      });
      console.log(ebList);
      return ebList;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getAll(currentUser) {
    const _query = 'SELECT * FROM EB where EB.num not in (select numEB from AO)';
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
        const ebObject = JSON.parse(JSON.stringify(eb));
        // Add the currentUser field to the ebObject
        ebObject.currentUser = currentUser;
        //return ebObject;

        // Assuming dateEB and dateValidation are in 'YYYY-MM-DD' format
        const dateEB = new Date(ebObject.dateEB);
        dateEB.setDate(dateEB.getDate() + 1);
        const modifiedDateEB = dateEB.toISOString().split('T')[0];
        
        const dateValidation = new Date(ebObject.dateValidation);
        dateValidation.setDate(dateValidation.getDate() + 1);
        const modifiedDateValidation = dateValidation.toISOString().split('T')[0];
        
        return {
          ...ebObject,
          dateEB: modifiedDateEB,
          dateValidation: modifiedDateValidation,
        };
      });
      console.info(ebList);
      return ebList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  static async getAll2(currentUser) {
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
        const ebObject = JSON.parse(JSON.stringify(eb));
        // Add the currentUser field to the ebObject
        ebObject.currentUser = currentUser;
        //return ebObject;

        // Assuming dateEB and dateValidation are in 'YYYY-MM-DD' format
        const dateEB = new Date(ebObject.dateEB);
        dateEB.setDate(dateEB.getDate() + 1);
        const modifiedDateEB = dateEB.toISOString().split('T')[0];
        
        const dateValidation = new Date(ebObject.dateValidation);
        dateValidation.setDate(dateValidation.getDate() + 1);
        const modifiedDateValidation = dateValidation.toISOString().split('T')[0];
        
        return {
          ...ebObject,
          dateEB: modifiedDateEB,
          dateValidation: modifiedDateValidation,
        };
      });
      console.info(ebList);
      return ebList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  static async getDem(currentUser){
    const _query = "SELECT EB.num, EB.objet, EB.agence, EB.observation, EB.prog_nonprog, EB.classe, EB.qualification, EB.secteur, EB.caution, EB.estimation, EB.dateEB, EB.modePassation, EB.numUtilisateur, EB.validerPar, EB.dateValidation FROM EB inner join Utilisateur on EB.numUtilisateur=Utilisateur.immatricule WHERE Utilisateur.fonction='Demandeur' and (EB.validerPar='' or EB.validerPar=?) and EB.num not in (select numEB from AO)";

    try {
      const rows = await new Promise((resolve, reject) => {
        pool.query(_query,[currentUser] , (err, rows) => {
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
        const ebObject = JSON.parse(JSON.stringify(eb));
        // Add the currentUser field to the ebObject
        ebObject.currentUser = currentUser;
        //return ebObject;

        // Assuming dateEB and dateValidation are in 'YYYY-MM-DD' format
        const dateEB = new Date(ebObject.dateEB);
        dateEB.setDate(dateEB.getDate() + 1);
        const modifiedDateEB = dateEB.toISOString().split('T')[0];
        
        const dateValidation = new Date(ebObject.dateValidation);
        dateValidation.setDate(dateValidation.getDate() + 1);
        const modifiedDateValidation = dateValidation.toISOString().split('T')[0];
        
        return {
          ...ebObject,
          dateEB: modifiedDateEB,
          dateValidation: modifiedDateValidation,
        };
      });
      console.info(ebList);
      return ebList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  static async getDem2(currentUser){
    const _query = "SELECT EB.num, EB.objet, EB.agence, EB.observation, EB.prog_nonprog, EB.classe, EB.qualification, EB.secteur, EB.caution, EB.estimation, EB.dateEB, EB.modePassation, EB.numUtilisateur, EB.validerPar, EB.dateValidation FROM EB inner join Utilisateur on EB.numUtilisateur=Utilisateur.immatricule WHERE Utilisateur.fonction='Demandeur' and (EB.validerPar='' or EB.validerPar=?)";

    try {
      const rows = await new Promise((resolve, reject) => {
        pool.query(_query,[currentUser] , (err, rows) => {
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
        const ebObject = JSON.parse(JSON.stringify(eb));
        // Add the currentUser field to the ebObject
        ebObject.currentUser = currentUser;
        //return ebObject;

        // Assuming dateEB and dateValidation are in 'YYYY-MM-DD' format
        const dateEB = new Date(ebObject.dateEB);
        dateEB.setDate(dateEB.getDate() + 1);
        const modifiedDateEB = dateEB.toISOString().split('T')[0];
        
        const dateValidation = new Date(ebObject.dateValidation);
        dateValidation.setDate(dateValidation.getDate() + 1);
        const modifiedDateValidation = dateValidation.toISOString().split('T')[0];
        
        return {
          ...ebObject,
          dateEB: modifiedDateEB,
          dateValidation: modifiedDateValidation,
        };
      });
      console.info(ebList);
      return ebList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  static async getForDM(currentUser){
    const _query = "SELECT EB.num, EB.objet, EB.agence, EB.observation, EB.prog_nonprog, EB.classe, EB.qualification, EB.secteur, EB.caution, EB.estimation, EB.dateEB, EB.modePassation, EB.numUtilisateur, EB.validerPar, EB.dateValidation FROM EB inner join Utilisateur on cast(EB.validerPar as SIGNED)=Utilisateur.immatricule WHERE (Utilisateur.fonction='DTI' or Utilisateur.fonction='CM' or Utilisateur.fonction='DM') and EB.num not in (select numEB from AO)";

    try {
      const rows = await new Promise((resolve, reject) => {
        pool.query(_query,(err, rows) => {
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
        const ebObject = JSON.parse(JSON.stringify(eb));
        // Add the currentUser field to the ebObject
        ebObject.currentUser = currentUser;
        //return ebObject;

        // Assuming dateEB and dateValidation are in 'YYYY-MM-DD' format
        const dateEB = new Date(ebObject.dateEB);
        dateEB.setDate(dateEB.getDate() + 1);
        const modifiedDateEB = dateEB.toISOString().split('T')[0];
        
        const dateValidation = new Date(ebObject.dateValidation);
        dateValidation.setDate(dateValidation.getDate() + 1);
        const modifiedDateValidation = dateValidation.toISOString().split('T')[0];
        
        return {
          ...ebObject,
          dateEB: modifiedDateEB,
          dateValidation: modifiedDateValidation,
        };
      });
      console.info(ebList);
      return ebList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getForDM2(currentUser){
    const _query = "SELECT EB.num, EB.objet, EB.agence, EB.observation, EB.prog_nonprog, EB.classe, EB.qualification, EB.secteur, EB.caution, EB.estimation, EB.dateEB, EB.modePassation, EB.numUtilisateur, EB.validerPar, EB.dateValidation FROM EB inner join Utilisateur on cast(EB.validerPar as SIGNED)=Utilisateur.immatricule WHERE (Utilisateur.fonction='DTI' or Utilisateur.fonction='CM' or Utilisateur.fonction='DM')";

    try {
      const rows = await new Promise((resolve, reject) => {
        pool.query(_query,(err, rows) => {
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
        const ebObject = JSON.parse(JSON.stringify(eb));
        // Add the currentUser field to the ebObject
        ebObject.currentUser = currentUser;
        //return ebObject;

        // Assuming dateEB and dateValidation are in 'YYYY-MM-DD' format
        const dateEB = new Date(ebObject.dateEB);
        dateEB.setDate(dateEB.getDate() + 1);
        const modifiedDateEB = dateEB.toISOString().split('T')[0];
        
        const dateValidation = new Date(ebObject.dateValidation);
        dateValidation.setDate(dateValidation.getDate() + 1);
        const modifiedDateValidation = dateValidation.toISOString().split('T')[0];
        
        return {
          ...ebObject,
          dateEB: modifiedDateEB,
          dateValidation: modifiedDateValidation,
        };
      });
      console.info(ebList);
      return ebList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

module.exports = EBDAO;
