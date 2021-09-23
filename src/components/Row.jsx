import React from 'react';
import Piece from './Piece';
import PropTypes from 'prop-types';

const Row = (props) => {
  const rowMap = props.row.map((piece) => {
    return (
      <Piece piece={piece} key={`piece${piece.row}${piece.col}`} win={props.win} loss={props.loss} />
    );
  });

  return (
    <div className="row">
      {rowMap}
    </div>
  );
};

Row.propTypes = {
  row: PropTypes.arrayOf(
    PropTypes.shape({
      val: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      uncovered: PropTypes.bool,
      markedAsMine: PropTypes.bool,
      row: PropTypes.number,
      col: PropTypes.number,
    }),
  ),
  win: PropTypes.bool,
  loss: PropTypes.bool,
};

export default Row;
