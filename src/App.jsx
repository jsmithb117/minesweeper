import './App.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import Rows from './components/Rows';
import {
  leftClick,
  rightClick,
} from './features/actionCreators';

const App = () => {
  const dispatch = useDispatch();
  document.addEventListener('contextmenu', event => event.preventDefault());

  const handleLeftClick = (piece) => {
    dispatch(leftClick(piece));
  }

  const handleRightClick = (piece) => {
    dispatch(rightClick(piece));
  }


  return (
    <div className="App">
      <Rows handleLeftClick={handleLeftClick} handleRightClick={handleRightClick} />
    </div>
  );

}

export default App;
