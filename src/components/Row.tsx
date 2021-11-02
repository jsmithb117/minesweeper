import { IRowProps } from '../interfaces/interfaces';
import Piece from './Piece';

const Row = ({ row, win, loss }: IRowProps) => {
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
