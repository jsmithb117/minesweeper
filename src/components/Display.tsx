import { useDispatch } from 'react-redux';
import { useAppSelector } from '../features/hooks';
import { IInitialState } from '../features/initialState';
import { revertBoard, resetWinLoss } from '../features/actionCreators';

const Display = () => {
  const minesDisplay = useAppSelector((state: IInitialState) => state.form.minesDisplay);
  const time = useAppSelector((state: IInitialState) => state.form.time);
  const dispatch = useDispatch();

  const resetButtonHandler = () => {
    dispatch(revertBoard());
    dispatch(resetWinLoss());
  };

  return (
    <div className="display">
      <div className="minesremaining">
        Mines Remaining: {minesDisplay}
      </div>
      <button onClick={resetButtonHandler}>
        Reset Board
      </button>
      <div className="time">
        Time: {time}
      </div>
    </div>
  );
};

export default Display;
