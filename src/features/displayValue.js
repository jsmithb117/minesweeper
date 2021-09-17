const displayValue = (piece) => {
  if (piece.markedAsMine) {
    return 'X';
  }
  if (piece.uncovered) {
    return piece.val;
  }
  return 'O';
};

export default displayValue;
