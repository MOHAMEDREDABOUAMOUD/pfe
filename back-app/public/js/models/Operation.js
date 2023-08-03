class Operation {
    constructor(operationData) {
      this.code = operationData.code;
      this.agence = operationData.agence;
      this.DA = operationData.DA;
      this.imputation = operationData.imputation;
      this.natureProjet = operationData.natureProjet;
      this.operation = operationData.operation;
      this.programme = operationData.programme;
      this.situation = operationData.situation;
      this.superficie = operationData.superficie;
      this.typeProjet = operationData.typeProjet;
      this.numEB = operationData.numEB;
    }
  }
  
  module.exports = Operation;
  