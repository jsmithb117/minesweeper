import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setLength,
  setWidth,
  setMines,
  setDifficulty,
} from '../features/formActionCreators';
export const defaultVal = 'Default';
const Form = () => {
  const dispatch = useDispatch();
  const beginner = 'Beginner';
  const intermediate = 'Intermediate';
  const expert = 'Expert';
  const custom = 'Custom';

  const [difficulty, setStateDifficulty] = useState(defaultVal);
  const [length, setStateLength] = useState(10);
  const [width, setStateWidth] = useState(10);
  const [mines, setStateMines] = useState(10);


  interface event {
    target: {
      value: string,
    }
  };

  const formSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    dispatch(setLength(length));
    dispatch(setWidth(width));
    dispatch(setMines(mines));
    dispatch(setDifficulty(difficulty));
  }
  const onRadioChange = (e: event) => {
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
    setStateDifficulty(e.target.value);
  };
  return (
    <div className="appchild form">
      <form onSubmit={(e) => formSubmit(e)}>
        <div className="radio beginner">
          <label>
            <input
              type="radio"
              id="beginner"
              value={beginner}
              checked={difficulty === beginner}
              onChange={(e) => onRadioChange(e)}
            />
            {beginner}
          </label>
        </div>
        <div className="radio default">
          <label>
            <input
              type="radio"
              id="default"
              value={defaultVal}
              checked={difficulty === defaultVal}
              onChange={(e) => onRadioChange(e)}
            />
            {defaultVal}
          </label>
        </div>
        <div className="radio intermediate">
          <label>
            <input
              type="radio"
              id="intermediate"
              value={intermediate}
              checked={difficulty === intermediate}
              onChange={(e) => onRadioChange(e)}
            />
            {intermediate}
          </label>
        </div>
        <div className="radio expert">
          <label>
            <input
              type="radio"
              id="expert"
              value={expert}
              checked={difficulty === expert}
              onChange={(e) => onRadioChange(e)}
            />
            {expert}
          </label>
        </div>
        <div className="radio custom">
          <label>
            <input
              type="radio"
              id="custom"
              value={custom}
              checked={difficulty === custom}
              onChange={onRadioChange}
            />
            {custom}
            <div className="radionumber length">
              {"Length:"}
              <input
                type="number"
                id="customlength"
                data-testid="length-input"
                value={length}
                min="6"
                max="30"
                onChange={(e) => setStateLength(parseInt(e.target.value))}
              />
            </div>
            <div className="radionumber width">
              {"Width:"}
              <input
                type="number"
                id="customwidth"
                data-testid="width-input"
                value={width}
                min="6"
                max="30"
                onChange={(e) => setStateWidth(parseInt(e.target.value))}
              />
            </div>
            <div className="radionumber mines">
              {"Mines:"}
              <input
                type="number"
                id="custommines"
                data-testid="mines-input"
                value={mines}
                min="6"
                max="99"
                onChange={(e) => setStateMines(parseInt(e.target.value))}
              />
            </div>
          </label>
        </div>
        <div className="radio difficulty">
          Selected option is : {difficulty}
        </div>
        <button
          className="submitradio"
          type="submit"
          id="customsubmit"
          data-testid="submit-input"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
