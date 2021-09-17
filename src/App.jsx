import './App.css';
import React from 'react';
import Rows from './components/Rows';

const App = () => {
  document.addEventListener('contextmenu', event => event.preventDefault());

  return (
    <div className="App">
      <Rows />
    </div>
  );

}

export default App;
