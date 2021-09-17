import React from 'react';
import Row from './Row';

const Rows = (props) => {
  const rowsMap = props.board.map((row, index) => {
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
