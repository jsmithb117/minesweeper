import React from 'react';
import { useDispatch } from 'react-redux';
import { leftClick, rightClick } from '../features/actionCreators';
import displayValue from '../features/displayValue';
import pieceClass from '../features/pieceClass';

const Piece = (props) => {
  const dispatch = useDispatch();

  return (
  <button className={pieceClass(props.piece)} onClick={() => dispatch(leftClick(props.piece))}
    onContextMenu={(event) => dispatch(rightClick(props.piece))}>
    {displayValue(props.piece)}
  </button>
  )
};

export default Piece;