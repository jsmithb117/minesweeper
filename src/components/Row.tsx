import { IRowProps } from '../interfaces/interfaces';
import Piece from './Piece';

const Row = ({ row, win, loss, cheat }: any) => {
  const rowMap = row.map((piece: any) => {
    return (
      <Piece piece={piece} key={`piece${piece.row}${piece.col}`} win={win} loss={loss} cheat={cheat}/>
    );
  });

  return (
    <div className="row">
      {rowMap}
    </div>
  );
};

export default Row;
