import buttonColor from './buttonColor';
import { IPiece } from './boardCreator';

const pieceClass = (piece: IPiece, width: number, length: number) => {
  const className: string = `piece width${width} length${length}`;

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
