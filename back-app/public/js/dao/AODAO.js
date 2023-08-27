// aoDAO.js
const AO = require('../models/AO');
const pool = require('./db');

class AODAO {
  static async create(ao) {
    const _query = `
      INSERT INTO AO (num, fileName, dateOuverturePlis, heureOuverturePlis, datePublicationPortail, dateEntreDM, dateAchevementTravauxCommission, avis, numEB, numLettreCommission)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      ao.num,
      ao.fileName,
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
      SET fileName=?, dateOuverturePlis=?, heureOuverturePlis=?, datePublicationPortail=?, dateEntreDM=?, dateAchevementTravauxCommission=?, avis=?, numEB=?, numLettreCommission=?
      WHERE num=?
    `;

    const values = [
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
      if (ao) {
        const dateOuverturePlis = new Date(ao.dateOuverturePlis);
        dateOuverturePlis.setDate(dateOuverturePlis.getDate() + 1);
        const modifieddateOuverturePlis = dateOuverturePlis.toISOString().split('T')[0];
        
        const heureOuverturePlis = new Date(ao.heureOuverturePlis);
        heureOuverturePlis.setDate(heureOuverturePlis.getDate() + 1);
        const modifiedheureOuverturePlis = heureOuverturePlis.toISOString().split('T')[0];
        
        const datePublicationPortail = new Date(ao.datePublicationPortail);
        datePublicationPortail.setDate(datePublicationPortail.getDate() + 1);
        const modifieddatePublicationPortail = datePublicationPortail.toISOString().split('T')[0];
        
        const dateEntreDM = new Date(ao.dateEntreDM);
        dateEntreDM.setDate(dateEntreDM.getDate() + 1);
        const modifieddateEntreDM = dateEntreDM.toISOString().split('T')[0];
        
        const dateAchevementTravauxCommission = new Date(ao.dateAchevementTravauxCommission);
        dateAchevementTravauxCommission.setDate(dateAchevementTravauxCommission.getDate() + 1);
        const modifieddateAchevementTravauxCommission = dateAchevementTravauxCommission.toISOString().split('T')[0];
        
        return new AO({
          ...ao,
          dateOuverturePlis: modifieddateOuverturePlis,
          heureOuverturePlis: modifiedheureOuverturePlis,
          datePublicationPortail: modifieddatePublicationPortail,
          dateEntreDM: modifieddateEntreDM,
          dateAchevementTravauxCommission: modifieddateAchevementTravauxCommission
        });
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getByEBNum(num){
    const _query = 'SELECT * FROM AO WHERE numEB=?';

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
      if (ao) {
        const dateOuverturePlis = new Date(ao.dateOuverturePlis);
        dateOuverturePlis.setDate(dateOuverturePlis.getDate() + 1);
        const modifieddateOuverturePlis = dateOuverturePlis.toISOString().split('T')[0];
        
        const heureOuverturePlis = new Date(ao.heureOuverturePlis);
        heureOuverturePlis.setDate(heureOuverturePlis.getDate() + 1);
        const modifiedheureOuverturePlis = heureOuverturePlis.toISOString().split('T')[0];
        
        const datePublicationPortail = new Date(ao.datePublicationPortail);
        datePublicationPortail.setDate(datePublicationPortail.getDate() + 1);
        const modifieddatePublicationPortail = datePublicationPortail.toISOString().split('T')[0];
        
        const dateEntreDM = new Date(ao.dateEntreDM);
        dateEntreDM.setDate(dateEntreDM.getDate() + 1);
        const modifieddateEntreDM = dateEntreDM.toISOString().split('T')[0];
        
        const dateAchevementTravauxCommission = new Date(ao.dateAchevementTravauxCommission);
        dateAchevementTravauxCommission.setDate(dateAchevementTravauxCommission.getDate() + 1);
        const modifieddateAchevementTravauxCommission = dateAchevementTravauxCommission.toISOString().split('T')[0];
        
        return new AO({
          ...ao,
          dateOuverturePlis: modifieddateOuverturePlis,
          heureOuverturePlis: modifiedheureOuverturePlis,
          datePublicationPortail: modifieddatePublicationPortail,
          dateEntreDM: modifieddateEntreDM,
          dateAchevementTravauxCommission: modifieddateAchevementTravauxCommission
        });
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getByUserId(currentUser) {
    const _query = 'SELECT AO.num, AO.dateOuverturePlis, AO.heureOuverturePlis, AO.datePublicationPortail, AO.dateEntreDM, AO.dateAchevementTravauxCommission, AO.avis, AO.numEB, AO.numLettreCommission, AO.fileName FROM AO inner join EB on AO.numEB=EB.num where EB.numUtilisateur=?';

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
        // Assuming dateEB and dateValidation are in 'YYYY-MM-DD' format
        const dateOuverturePlis = new Date(ao.dateOuverturePlis);
        dateOuverturePlis.setDate(dateOuverturePlis.getDate() + 1);
        const modifieddateOuverturePlis = dateOuverturePlis.toISOString().split('T')[0];
        
        const heureOuverturePlis = new Date(ao.heureOuverturePlis);
        heureOuverturePlis.setDate(heureOuverturePlis.getDate() + 1);
        const modifiedheureOuverturePlis = heureOuverturePlis.toISOString().split('T')[0];
        
        const datePublicationPortail = new Date(ao.datePublicationPortail);
        datePublicationPortail.setDate(datePublicationPortail.getDate() + 1);
        const modifieddatePublicationPortail = datePublicationPortail.toISOString().split('T')[0];
        
        const dateEntreDM = new Date(ao.dateEntreDM);
        dateEntreDM.setDate(dateEntreDM.getDate() + 1);
        const modifieddateEntreDM = dateEntreDM.toISOString().split('T')[0];
        
        const dateAchevementTravauxCommission = new Date(ao.dateAchevementTravauxCommission);
        dateAchevementTravauxCommission.setDate(dateAchevementTravauxCommission.getDate() + 1);
        const modifieddateAchevementTravauxCommission = dateAchevementTravauxCommission.toISOString().split('T')[0];
        
        return {
          ...ao,
          dateOuverturePlis: modifieddateOuverturePlis,
          heureOuverturePlis: modifiedheureOuverturePlis,
          datePublicationPortail: modifieddatePublicationPortail,
          dateEntreDM: modifieddateEntreDM,
          dateAchevementTravauxCommission: modifieddateAchevementTravauxCommission
        };
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
        // Assuming dateEB and dateValidation are in 'YYYY-MM-DD' format
        const dateOuverturePlis = new Date(ao.dateOuverturePlis);
        dateOuverturePlis.setDate(dateOuverturePlis.getDate() + 1);
        const modifieddateOuverturePlis = dateOuverturePlis.toISOString().split('T')[0];
        
        const heureOuverturePlis = new Date(ao.heureOuverturePlis);
        heureOuverturePlis.setDate(heureOuverturePlis.getDate() + 1);
        const modifiedheureOuverturePlis = heureOuverturePlis.toISOString().split('T')[0];
        
        const datePublicationPortail = new Date(ao.datePublicationPortail);
        datePublicationPortail.setDate(datePublicationPortail.getDate() + 1);
        const modifieddatePublicationPortail = datePublicationPortail.toISOString().split('T')[0];
        
        const dateEntreDM = new Date(ao.dateEntreDM);
        dateEntreDM.setDate(dateEntreDM.getDate() + 1);
        const modifieddateEntreDM = dateEntreDM.toISOString().split('T')[0];
        
        const dateAchevementTravauxCommission = new Date(ao.dateAchevementTravauxCommission);
        dateAchevementTravauxCommission.setDate(dateAchevementTravauxCommission.getDate() + 1);
        const modifieddateAchevementTravauxCommission = dateAchevementTravauxCommission.toISOString().split('T')[0];
        
        return {
          ...ao,
          dateOuverturePlis: modifieddateOuverturePlis,
          heureOuverturePlis: modifiedheureOuverturePlis,
          datePublicationPortail: modifieddatePublicationPortail,
          dateEntreDM: modifieddateEntreDM,
          dateAchevementTravauxCommission: modifieddateAchevementTravauxCommission
        };
      });

      return aoList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

module.exports = AODAO;