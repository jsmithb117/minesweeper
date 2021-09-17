import React from 'react';

const Piece = (props) => {
  const buttonColor = props.piece.val === 0 ? null :
    props.piece.val === 1 ? 'blue' :
    props.piece.val === 2 ? 'green' :
    props.piece.val === 3 ? 'red' :
    props.piece.val === 4 ? 'purple' :
    props.piece.val === 5 ? 'maroon' :
    props.piece.val === 6 ? 'turquoise' :
    props.piece.val === 7 ? 'black' :
    props.piece.val === 8 ? 'gray' :
    undefined;

  const uncoveredClassName = `uncovered piece row${props.piece.row} col${props.piece.col} ${buttonColor}`;
  const coveredClassName = `covered piece row${props.piece.row} col${props.piece.col}`;
  const className = props.piece.uncovered ? uncoveredClassName : coveredClassName;

  return (
  <button className={className} onClick={(event) => props.handleLeftClick(props.piece)} onContextMenu={(event) => props.handleRightClick(props.piece)}>
    {props.piece.val}
  </button>
  )
};

export default Piece;