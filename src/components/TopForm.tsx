import { useAppSelector } from '../features/hooks';
import { IInitialState } from '../features/initialState';

const TopForm = () => {
  const minesDisplay = useAppSelector((state: IInitialState) => state.form.minesDisplay);
  const time = useAppSelector((state: IInitialState) => state.form.time);

  return (
    <div className="topform">
      <div className="minesremaining">
        Mines Remaining: {minesDisplay}
      </div>
      <div className="time">
        Time: {time}
      </div>
    </div>
  );
};

export default TopForm;
