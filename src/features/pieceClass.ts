import buttonColor from './buttonColor';
import { IPiece } from './boardCreator';

const pieceClass = (piece: IPiece) => {
  const className: string = `piece`;

  if (!piece.uncovered && !piece.markedAsMine) {
    return className.concat(' covered');
  }
  if (!piece.uncovered && piece.markedAsMine) {
    return className.concat(' covered mine');
  }
  if (piece.uncovered && !piece.markedAsMine) {
    return className.concat(` uncovered ${buttonColor(piece)}`);
  }
  return className;
};

export default pieceClass;
