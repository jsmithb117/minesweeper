import './App.css';
import React from 'react';
import Piece from './components/Piece';
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
        <Piece piece={this.state.board[0][0].val} />
      </div>
    );
  }
}

export default App;
