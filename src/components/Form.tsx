import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setLength,
  setWidth,
  setMines
} from '../features/actionCreators';

const Form = () => {
  const dispatch = useDispatch();
  const beginner = 'Beginner';
  const defaultVal = 'Default';
  const intermediate = 'Intermediate';
  const expert = 'Expert';
  const custom = 'Custom';

  const [selected, setSelected] = useState(defaultVal);
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
    if (val === defaultVal) {
      setStateLength(10);
      setStateWidth(10);
      setStateMines(10);
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
    <div className="appchild form">
      <form onSubmit={(e) => formSubmit(e)}>
        <div className="radio beginner">
          <label>
            <input
              type="radio"
              value={beginner}
              checked={selected === beginner}
              onChange={(e) => onRadioChange(e)}
            />
            {beginner}
          </label>
        </div>
        <div className="radio default">
          <label>
            <input
              type="radio"
              value={defaultVal}
              checked={selected === defaultVal}
              onChange={(e) => onRadioChange(e)}
            />
            {defaultVal}
          </label>
        </div>
        <div className="radio intermediate">
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
        <div className="radio expert">
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
        <div className="radio custom">
          <label>
            <input
              type="radio"
              value={custom}
              checked={selected === custom}
              onChange={onRadioChange}
            />
            {custom}
            <div className="radionumber length">
              {"Length:"}
              <input
                type="number"
                value={length}
                min="6"
                max="100"
                onChange={(e) => setStateLength(parseInt(e.target.value))}
              />
            </div>
            <div className="radionumber width">
              {"Width:"}
              <input
                type="number"
                value={width}
                min="6"
                max="100"
                onChange={(e) => setStateWidth(parseInt(e.target.value))}
              />
            </div>
            <div className="radionumber mines">
              {"Mines:"}
              <input
                type="number"
                value={mines}
                min="6"
                max="100"
                onChange={(e) => setStateMines(parseInt(e.target.value))}
              />
            </div>
          </label>
        </div>
        <div className="radio selected">
          Selected option is : {selected}
        </div>
        <button className="submitradio" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
