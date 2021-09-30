import { LEFTCLICK, RIGHTCLICK, leftClick, rightClick } from './actionCreators';

describe('actionCreators', () => {
  it('should create a LEFTCLICK action in the proper format', () => {
    const piece = {
      val: 0,
      uncovered: false,
      markedAsMine: false,
      row: 0,
      col: 0,
    };
    const left = leftClick(piece);
    expect(left).toEqual({ payload: { col: 0, row: 0, markedAsMine: false, uncovered: false, val: 0 }, type: LEFTCLICK });
  });
  it('should create a RIGHTCLICK action in the proper format', () => {
    const piece = {
      val: 0,
      uncovered: false,
      markedAsMine: false,
      row: 0,
      col: 0,
    };
    const right = rightClick(piece);
    expect(right).toEqual({ payload: {col: 0, row: 0, markedAsMine: false, uncovered: false, val: 0 }, type: RIGHTCLICK });
  });
});
