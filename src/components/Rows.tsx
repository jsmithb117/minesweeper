import Row from './Row';
import { useAppSelector } from '../features/hooks';
import { IInitialState } from '../features/initialState';

const Rows = () => {
  const board = useAppSelector((state: IInitialState) => state.click.board);
  const win = useAppSelector((state: IInitialState) => state.click.win);
  const loss = useAppSelector((state: IInitialState) => state.click.loss);
  const rowsMap = board.map((row, index) => {
    return (
      <Row row={row} key={`row${index}`} win={win} loss={loss} />
    );
  });

  return (
    <div className="appchild rows">
      {rowsMap}
    </div>
  );
};

export default Rows;
