import './App.css';
import React from 'react';
import Rows from './components/Rows';
import initialState from './features/initialState';
import zeroFinder from './features/zeroFinder';
import checkWin from './features/checkWin';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleClick = this.handleClick.bind(this);
    document.addEventListener('contextmenu', event => event.preventDefault());
  }

  handleClick (event, row, col) {
    event.preventDefault();
    if (this.state.win || this.state.loss) {
      return;
    }
    let leftClick = event.type === "click";
    let rightClick = event.type === "contextmenu";

    if (this.state.loss || this.state.win) {
      return;
    }

    if (rightClick && !this.state.board[row][col].uncovered) {
      event.target.style.color = !event.target.style.color ? 'black' : null
      event.target.innerHTML = event.target.innerHTML !== '?' ? 'M' : '?';
      this.setState((state) => {
        state.board[row][col].markedAsMine = event.target.innerHTML === 'M';
        return state;
      })
    }

    if (leftClick) {

      this.setState((state) => {
        let pieceIsX = state.board[row][col].val === 'X';
        let pieceIsMarkedAsMine = state.board[row][col].markedAsMine

        if (pieceIsX && !pieceIsMarkedAsMine) {
          state.loss = true;
          return state;
        }

        state = zeroFinder(parseInt(row), parseInt(col), state.board);
        return state;
      }, () => {
        if (checkWin(this.state.board)) {
          document.body.style = 'background: green;';
          console.log('You win!');
        }
        if (this.state.loss && !this.state.win) {
          document.body.style = 'background: red;';
          console.log('Sorry, try again.');
        }
      })
    }
  }

  render() {
    return (
      <div className="App">
        <Rows board={this.state.board} handleClick={this.handleClick} />
      </div>
    );
  }
}

export default App;
