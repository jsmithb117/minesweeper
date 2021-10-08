import { useSelector } from 'react-redux';
import { leftClick, rightClick, incrementMinesDisplay, decrementMinesDisplay } from '../features/actionCreators';
import displayValue from '../features/displayValue';
import pieceClass from '../features/pieceClass';
import { IPiece } from '../features/boardCreator';
import { useAppDispatch } from '../features/hooks';

interface IProps {
  piece: IPiece,
  loss: boolean | undefined,
  win: boolean | undefined,
};

const Piece = ({ piece }: IProps) => {
  const dispatch = useAppDispatch();
  const width = useSelector((state: any) => state.form.width);
  const length = useSelector((state: any) => state.form.length);

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
  if (piece.markedAsMine) {
    return (
      <button className={pieceClass(piece, width, length)} onClick={() => leftClickHandler()}
      onContextMenu={() => rightClickHandler()}>
      <span className="number">
      <svg width="24" height="24" viewBox="0 0 24 24"><path d="M21 8l-16-6v-2h-2v24h2v-10l16-6zm-5.696 0l-10.304 3.864v-7.728l10.304 3.864z"/></svg>
      </span>
    </button>
    )
  }
  return (
    <button className={pieceClass(piece, width, length)} onClick={() => leftClickHandler()}
      onContextMenu={() => rightClickHandler()}>
      <span className="number">{displayValue(piece)}</span>
    </button>
    );
};

export default Piece;
