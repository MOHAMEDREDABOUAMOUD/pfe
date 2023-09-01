class Piece {
    constructor(pieceData) {
      this.num = pieceData.num;
      this.libelle = pieceData.libelle;
      this.piece = pieceData.piece;
      this.base64= pieceData.base64;
      this.fileName = pieceData.fileName;
      this.numEB = pieceData.numEB;
    }
  }
  
  module.exports = Piece;
  