import Row from './Row';
import { useAppSelector } from '../features/hooks';

const Rows = () => {
  const board = useAppSelector((state) => state.board);
  const win = useAppSelector((state) => state.win);

  const loss = useAppSelector((state) => state.loss);
  const rowsMap = board.map((row: [], index: number) => {
    return (
      <Row row={row} key={`row${index}`} win={win} loss={loss} />
    );
  });

  return (
    <div className="rows">
      {rowsMap}
    </div>
  );
};

export default Rows;
