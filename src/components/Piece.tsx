import { useDispatch } from 'react-redux';
import { leftClick, rightClick } from '../features/actionCreators';
import displayValue from '../features/displayValue';
import pieceClass from '../features/pieceClass';
import AppDispatch from '../features/store';
import { PieceInterface } from '../features/boardCreator';

interface Props {
  piece: PieceInterface,
  loss: boolean,
  win: boolean,
};

const Piece = ({ piece }: Props) => {
  const dispatch: typeof AppDispatch = useDispatch();
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
