import { useSelector } from 'react-redux';
import './App.css';
import Rows from './components/Rows';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function App() {
  document.addEventListener('contextmenu', event => event.preventDefault());
  const win = useSelector((state) => state.win);
  const loss = useSelector((state) => state.loss);

  const boardColor = win ? 'green'
    : loss ? 'red'
    : 'white';

  const className = 'minesweeper'.concat(boardColor);

  return (
    <div className={className}>
      <HelmetProvider>
        <Rows />
        <Helmet bodyAttributes={{style: `background-color : ${boardColor}`}} />
      </HelmetProvider>
    </div>
  );
}

export default App;