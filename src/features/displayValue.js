const displayValue = (piece) => {
  if (piece.markedAsMine) {
    return 'X';
  }
  if (piece.uncovered && !piece.isMine) {
    return piece.val;
  }
  if (piece.isMine) {
    return 'Oops';
  }
  return 'O';
};

export default displayValue;
