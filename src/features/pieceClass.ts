import { IPiece } from '../interfaces/interfaces';
import buttonColor from './buttonColor';

const pieceClass = (piece: IPiece, width: number, length: number) => {
  let className: string = `piece width${width} length${length}`;

  if (!piece.uncovered) {
    className = className.concat(' covered');
  }
  if (piece.markedAsMine || piece.isMine) {
    className = className.concat(' mine');
  }
  if (piece.loser) {
    className = className.concat(' loser');
  }
  if (piece.uncovered && !piece.markedAsMine) {
    className = className.concat(` uncovered ${buttonColor(piece)}`);
  }
  return className;
};

export default pieceClass;
