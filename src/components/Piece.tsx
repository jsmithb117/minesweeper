import React from 'react';
import { useDispatch } from 'react-redux';
import { leftClick, rightClick } from '../features/actionCreators';
import displayValue from '../features/displayValue';
import pieceClass from '../features/pieceClass';

type Props = {
  piece: {
    val: number,
    isMine: boolean,
    uncovered: boolean,
    markedAsMine: boolean,
    row: number,
    col: number,
  },
  loss: boolean,
  win: boolean,
};

const Piece = ({ piece }: Props) => {
  const dispatch = useDispatch();
  const leftClickHandler = (event:any) => {
    piece = piece || event.props.piece;
    dispatch(leftClick(piece));
  };


  return (
  <button className={pieceClass(piece)} onClick={event => leftClickHandler(event)}
    onContextMenu={event => dispatch(rightClick(piece))}>
    {displayValue(piece)}
  </button>
  );
};

export default Piece;
