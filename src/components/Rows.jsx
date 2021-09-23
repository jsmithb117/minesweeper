import React from 'react';
import Row from './Row';
import { useSelector } from 'react-redux';

const Rows = () => {
  const board = useSelector((state) => state.board);
  const win = useSelector(state => state.win);
  const loss = useSelector(state => state.loss);
  const rowsMap = board.map((row, index) => {
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
