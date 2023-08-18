class LettreCommission {
    constructor(lettreCommissionData) {
      this.num = lettreCommissionData.num;
      this.numEnvoie = lettreCommissionData.numEnvoie;
      this.dateEnvoie = lettreCommissionData.dateEnvoie;
      this.destinataire = lettreCommissionData.destinataire;
      this.lettreCommission = lettreCommissionData.lettreCommission;
      this.fileName = lettreCommissionData.fileName;
    }
  }
  
  module.exports = LettreCommission;
  