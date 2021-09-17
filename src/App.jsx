import './App.css';
import React from 'react';
import Rows from './components/Rows';
import initialState from './features/initialState';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }


  render() {
    console.log(this.state.board[0][0])
    return (
      <div className="App">
        <Rows board={this.state.board} />
      </div>
    );
  }
}

export default App;
