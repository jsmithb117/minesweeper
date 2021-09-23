import React from 'react';
import { useDispatch } from 'react-redux';
import { leftClick, rightClick } from '../features/actionCreators';
import displayValue from '../features/displayValue';
import pieceClass from '../features/pieceClass';
import PropTypes from 'prop-types';

const Piece = (props) => {
  const dispatch = useDispatch();
  const leftClickHandler = (event) => {
    const piece = props.piece || event.props.piece;
    dispatch(leftClick(piece));
  };
  return (
  <button className={pieceClass(props.piece)} onClick={event => leftClickHandler(event)}
    onContextMenu={event => dispatch(rightClick(props.piece))}>
    {displayValue(props.piece)}
  </button>
  );
};

Piece.propTypes = {
  piece: PropTypes.shape({
    val: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    uncovered: PropTypes.bool,
    markedAsMine: PropTypes.bool,
    row: PropTypes.number,
    col: PropTypes.number,
  }),
  win: PropTypes.bool,
  loss: PropTypes.bool,
};

export default Piece;
