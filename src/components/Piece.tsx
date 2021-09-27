import { useDispatch } from 'react-redux';
import { leftClick, rightClick } from '../features/actionCreators';
import displayValue from '../features/displayValue';
import pieceClass from '../features/pieceClass';
import { TDispatch } from '../features/store';
import { IPiece } from '../features/boardCreator';

interface IProps {
  piece: IPiece,
  loss: boolean,
  win: boolean,
};

const Piece = ({ piece }: IProps) => {
  const dispatch = useDispatch<TDispatch>();
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
