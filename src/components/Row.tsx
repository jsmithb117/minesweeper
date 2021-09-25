import Piece from './Piece';
import { PieceType } from '../features/boardCreator';

interface Props {
  row: Array<PieceType>,
  win: boolean,
  loss: boolean,
};

const Row = ({ row, win, loss }: Props) => {
  const rowMap = row.map((piece) => {
    return (
      <Piece piece={piece} key={`piece${piece.row}${piece.col}`} win={win} loss={loss} />
    );
  });

  return (
    <div className="row">
      {rowMap}
    </div>
  );
};

export default Row;
