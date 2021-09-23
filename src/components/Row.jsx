import React from 'react';
import Piece from './Piece';
import PropTypes from 'prop-types';

type Props = {
  row: Array<{
    val: number,
    isMine: boolean,
    uncovered: boolean,
    markedAsMine: boolean,
    row: number,
    col: number,
  }>,
  win: boolean,
  loss: boolean,
};

const Row = ({ row, win, loss }) => {
  const rowMap: Array<{
    val: number,
    isMine: boolean,
    uncovered: boolean,
    markedAsMine: boolean,
    row: number,
    col: number,
  }> = row.map((piece) => {
    return (
      <Piece piece={piece} key={`piece${piece.row}${piece.col}`} win={win} loss={loss} />
    );
  });

  return (
    <div className="row">
      {rowMap}
    </div>
  );
};

export default Row;
