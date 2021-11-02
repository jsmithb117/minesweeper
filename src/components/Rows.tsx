import Row from './Row';
import { useAppSelector } from '../features/hooks';

const Rows = () => {
  const board = useAppSelector((state) => state?.click?.board);
  const win: boolean | undefined = useAppSelector((state) => state?.click?.win);
  const loss: boolean | undefined = useAppSelector((state) => state?.click?.loss);
  const rowsMap = board?.map((row: any, index: number) => {
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
