import React from 'react';
import Row from './Row';
import { useSelector } from 'react-redux';

const Rows = () => {
  const board = useSelector((state: IRootState) => state.board);
  const win = useSelector((state: IRootState) => state.win);
  const loss = useSelector((state: IRootState) => state.loss);
  const rowsMap = board.map((row: Array<{
    val: number,
    isMine: boolean,
    uncovered: boolean,
    markedAsMine: boolean,
    row: number,
    col: number,
  }>, index: number) => {
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
