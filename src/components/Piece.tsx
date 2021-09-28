import { leftClick, rightClick } from '../features/actionCreators';
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


  return (
    <button className={pieceClass(piece)} onClick={() => leftClickHandler()}
      onContextMenu={() => dispatch(rightClick(piece))}>
      {displayValue(piece)}
    </button>
    );
};

export default Piece;
