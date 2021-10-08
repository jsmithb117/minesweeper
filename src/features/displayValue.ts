import { IPiece } from './boardCreator';

const displayValue = (piece: IPiece) => {
  if (piece.uncovered && !piece.isMine) {
    return piece.val;
  }
  return '';
};

export default displayValue;
