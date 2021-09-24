import { Piece } from './boardCreator';

const displayValue = (piece: Piece) => {
  if (piece.markedAsMine) {
    return 'X';
  }
  if (piece.uncovered && !piece.isMine) {
    return piece.val;
  }
  if (piece.isMine) {
    return 'X';
  }
  return 'O';
};

export default displayValue;
