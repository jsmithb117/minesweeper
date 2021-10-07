import { useSelector } from 'react-redux';
import { leftClick, rightClick, incrementMinesDisplay, decrementMinesDisplay } from '../features/actionCreators';
import displayValue from '../features/displayValue';
import pieceClass from '../features/pieceClass';
import { IPiece } from '../features/boardCreator';
import { useAppDispatch } from '../features/hooks';

interface IProps {
  piece: IPiece,
  loss: boolean,
  win: boolean,
};

const Piece = ({ piece }: IProps) => {
  const dispatch = useAppDispatch();
  const width = useSelector((state: any) => state.form.width);
  const length = useSelector((state: any) => state.form.length);
  console.log('length: ', length)

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

  return (
    <button className={pieceClass(piece, width, length)} onClick={() => leftClickHandler()}
      onContextMenu={() => rightClickHandler()}>
      <span className="number">{displayValue(piece)}</span>
    </button>
    );
};

export default Piece;
