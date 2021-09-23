import Row from './Row';
import { useSelector } from 'react-redux';
import RootState from '../features/store';

const Rows = () => {
  const board = useSelector((state: typeof RootState) => state.board);
  const win = useSelector((state: typeof RootState) => state.win);
  const loss = useSelector((state: typeof RootState) => state.loss);
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
