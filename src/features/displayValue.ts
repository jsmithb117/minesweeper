import { IPiece } from "../interfaces/interfaces";

const displayValue = (piece: IPiece) => {
  if (piece.uncovered && !piece.isMine) {
    return piece.val;
  }
  return '';
};

export default displayValue;
