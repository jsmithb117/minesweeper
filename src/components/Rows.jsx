import React from 'react';
import Row from './Row';
import { useSelector } from 'react-redux';

const Rows = (props) => {
  const board = useSelector((state) => state.board);
  const rowsMap = board.map((row, index) => {
    return (
      <Row row={row} key={`row${index}`} />
    )
  });

  return (
    <div className="rows">
      {rowsMap}
    </div>
  );
};

export default Rows;
