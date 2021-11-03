import { useSelector } from 'react-redux';
import { leftClick, rightClick } from '../actionCreators/clickActionCreators';
import { incrementMinesDisplay, decrementMinesDisplay } from '../actionCreators/formActionCreators';
import displayValue from '../features/displayValue';
import pieceClass from '../features/pieceClass';
import { useAppDispatch } from '../features/hooks';
import { IProps, IState } from '../interfaces/interfaces';

const Piece = ({ piece }: IProps) => {
  const dispatch = useAppDispatch();
  const width = useSelector((state: IState) => state.form.width);
  const length = useSelector((state: IState) => state.form.length);
  const loss = useSelector((state: IState) => state.click.loss);
  const paused = useSelector((state: IState) => state.form.paused);

  const leftClickHandler = () => {
    dispatch(leftClick(piece));
  };

  const rightClickHandler = () => {
    if (piece.markedAsMine) {
      dispatch(incrementMinesDisplay());
    } else {
      dispatch(decrementMinesDisplay());
    }
    dispatch(rightClick(piece));
  };

  const className = pieceClass(piece, width, length);

  if (paused) {
    return (
      <button className={pieceClass({ ...piece, uncovered: false}, width, length).concat(' paused')}>

    </button>
    )
  }
  if (piece.markedAsMine) {
    return (
      <button className={className} onClick={() => leftClickHandler()}
      onContextMenu={() => rightClickHandler()}>
      <span className="flag">
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M8 44c4-10 28-10 32 0z" stroke="#000"/><path d="M24 6L2 15l22 10z" stroke="black" fill="red"/><path strokeLinecap="round" strokeWidth="4" stroke="black" d="M24 6v34"/></svg>
      </span>
    </button>
    )
  }
  if (piece.isMine && loss) {
    return (
      <button className={className} onClick={() => leftClickHandler()}
      onContextMenu={() => rightClickHandler()}>
      <span className="number">
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="18"/><path strokeLinecap="round" strokeWidth="6" stroke="#000" d="M8 8l32 32M8 40L40 8M4 24h40M24 4v40"/><path d="M10 24a14 14 0 0114-14" stroke="#848484" fill="none" strokeLinecap="round" strokeWidth="3"/></svg>
      </span>
    </button>
    )
  }

  return (
    <button className={className} onClick={() => leftClickHandler()}
      onContextMenu={() => rightClickHandler()}>
      <span className="number">{displayValue(piece)}</span>
    </button>
    );
};

export default Piece;
