import React from 'react';
import Piece from './Piece';

const Row = (props) => {
  const rowMap = props.row.map((piece) => {
    return (
      <Piece piece={piece} key={`piece${piece.row}${piece.col}`} handleLeftClick={props.handleLeftClick} handleRightClick={props.handleRightClick} />
    );
  });

  return (
    <div className="row">
      {rowMap}
    </div>
  )
};

export default Row;