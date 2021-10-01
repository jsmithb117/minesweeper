import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setLength,
  setWidth,
  setMines
} from '../features/actionCreators';

const BottomForm = () => {
  const dispatch = useDispatch();
  const beginner = 'Beginner';
  const intermediate = 'Intermediate';
  const expert = 'Expert';
  const custom = 'Custom';

  const [selected, setSelected] = useState(beginner);
  const [length, setStateLength] = useState(10);
  const [width, setStateWidth] = useState(10);
  const [mines, setStateMines] = useState(10);

  const formSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    dispatch(setLength(length));
    dispatch(setWidth(width));
    dispatch(setMines(mines));
  }
  const onRadioChange = (e: any) => {
    const val = e.target.value;
    if (val === beginner) {
      setStateLength(8);
      setStateWidth(8);
      setStateMines(8);
    }
    if (val === intermediate) {
      setStateLength(13);
      setStateWidth(15);
      setStateMines(40);
    }
    if (val === expert) {
      setStateLength(16);
      setStateWidth(30);
      setStateMines(99);
    }
    setSelected(e.target.value);
  };

  return (
    <div className="bottomform">
      <form onSubmit={formSubmit}>
        <div className="radio">
          <label>
            <input
              type="radio"
              value={beginner}
              checked={selected === beginner}
              onChange={onRadioChange}
            />
            {beginner}
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value={intermediate}
              checked={selected === intermediate}
              onChange={onRadioChange}
            />
            {intermediate}
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value={expert}
              checked={selected === expert}
              onChange={onRadioChange}
            />
            {expert}
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value={custom}
              checked={selected === custom}
              onChange={onRadioChange}
            />
            {custom}
            <div className="number length">
              {"Length:"}
              <input
                type="number"
                value={length}
                min="10"
                max="100"
                onChange={(e) => setStateLength(parseInt(e.target.value))}
              />
            </div>
            <div className="number width">
              {"Width:"}
              <input
                type="number"
                value={width}
                min="10"
                max="100"
                onChange={(e) => setStateWidth(parseInt(e.target.value))}
              />
            </div>
            <div className="number mines">
              {"Mines:"}
              <input
                type="number"
                value={mines}
                min="10"
                max="100"
                onChange={(e) => setStateMines(parseInt(e.target.value))}
              />
            </div>
          </label>
        </div>
        <div>
          Selected option is : {selected}
        </div>
        <button className="btn btn-default" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BottomForm;
