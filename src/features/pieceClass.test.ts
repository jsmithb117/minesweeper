import pieceClass from './pieceClass';

type TPiece = {
  val: number,
  isMine: boolean,
  uncovered: boolean,
  markedAsMine: boolean,
  row: number,
  col: number,
};

describe('pieceClass', () => {
  const piece: TPiece = {
    val: 0,
    isMine: false,
    uncovered: false,
    markedAsMine: false,
    row: 0,
    col: 0,
  };
  it('returns className for a covered Piece that is not a mine', () => {
    expect(pieceClass({ ...piece }, 10, 10)).toBe('piece width10 length10 covered');
  });
  it('returns className for an uncovered 0 Piece that is not a mine', () => {
    expect(pieceClass({ ...piece, uncovered: true }, 10, 10)).toBe('piece width10 length10 uncovered null');
  });
  it('returns className for an uncovered 1 Piece that is not a mine', () => {
    expect(pieceClass({ ...piece, val: 1, uncovered: true }, 10, 10)).toBe('piece width10 length10 uncovered blue');
  });
  it('returns className for an uncovered 2 Piece that is not a mine', () => {
    expect(pieceClass({ ...piece, val: 2, uncovered: true }, 10, 10)).toBe('piece width10 length10 uncovered green');
  });
  it('returns className for an uncovered 3 Piece that is not a mine', () => {
    expect(pieceClass({ ...piece, val: 3, uncovered: true }, 10, 10)).toBe('piece width10 length10 uncovered red');
  });
  it('returns className for an uncovered 4 Piece that is not a mine', () => {
    expect(pieceClass({ ...piece, val: 4, uncovered: true }, 10, 10)).toBe('piece width10 length10 uncovered purple');
  });
  it('returns className for an uncovered 5 Piece that is not a mine', () => {
    expect(pieceClass({ ...piece, val: 5, uncovered: true }, 10, 10)).toBe('piece width10 length10 uncovered maroon');
  });
  it('returns className for an uncovered 6 Piece that is not a mine', () => {
    expect(pieceClass({ ...piece, val: 6, uncovered: true }, 10, 10)).toBe('piece width10 length10 uncovered turquoise');
  });
  it('returns className for an uncovered 7 Piece that is not a mine', () => {
    expect(pieceClass({ ...piece, val: 7, uncovered: true }, 10, 10)).toBe('piece width10 length10 uncovered black');
  });
  it('returns className for an uncovered 8 Piece that is not a mine', () => {
    expect(pieceClass({ ...piece, val: 8, uncovered: true }, 10, 10)).toBe('piece width10 length10 uncovered gray');
  });
  it('returns className for an uncovered 9 Piece that is not a mine', () => {
    expect(pieceClass({ ...piece, val: 9, uncovered: true }, 10, 10)).toBe('piece width10 length10 uncovered null');
  });
  it('returns className for a covered Piece that is marked as a mine', () => {
    expect(pieceClass({ ...piece, markedAsMine: true }, 10, 10)).toBe('piece width10 length10 covered mine');
  });
  it('returns className for an uncovered Piece that is marked as a mine', () => {
    expect(pieceClass({ ...piece, uncovered: true, markedAsMine: true }, 10, 10)).toBe('piece width10 length10');
  });
});