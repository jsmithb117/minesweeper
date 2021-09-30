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
    <button className={pieceClass(piece)} onClick={() => leftClickHandler()}
      onContextMenu={() => rightClickHandler()}>
      {displayValue(piece)}
    </button>
    );
};

export default Piece;
