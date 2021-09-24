import buttonColor from './buttonColor';
import { Piece } from './boardCreator';

const pieceClass = (piece: Piece) => {
  const className: string = `piece`;

  if (!piece.uncovered && !piece.markedAsMine) {
    return className.concat(' covered');
  }
  if (!piece.uncovered && piece.markedAsMine) {
    return className.concat(' covered mine');
  }
  if (piece.uncovered) {
    return className.concat(` uncovered ${buttonColor(piece)}`);
  }
  return className;
};

export default pieceClass;
