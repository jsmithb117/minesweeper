import { IPiece } from '../interfaces/interfaces';
import { buttonColorFunc } from './index';

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
    className = className.concat(` uncovered ${buttonColorFunc(piece)}`);
  }
  return className;
};

export default pieceClass;
