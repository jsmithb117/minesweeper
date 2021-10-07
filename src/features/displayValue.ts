import { IPiece } from './boardCreator';

const displayValue = (piece: IPiece) => {
  if (piece.markedAsMine) {
    return 'X';
  }
  if (piece.uncovered && !piece.isMine) {
    return piece.val;
  }
  // if (piece.isMine) {
  //   return 'X';
  // }
  return '';
};

export default displayValue;
