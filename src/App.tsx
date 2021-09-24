import { useSelector } from 'react-redux';
import './App.css';
import Rows from './components/Rows';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import RootState from './features/store';

function App() {
  document.addEventListener('contextmenu', event => event.preventDefault());
  const win = useSelector((state: typeof RootState) => state.win);
  const loss = useSelector((state: typeof RootState) => state.loss);

  const boardColor = win ? 'green'
    : loss ? 'red'
    : 'white';

  const className = 'minesweeper'.concat(boardColor);

  return (
    <div className={className}>
      <HelmetProvider>
        <Rows />
        <Helmet>
          <style type='text/css'>
          {`
            body {
              background-color : ${boardColor}
            }
          `}
          </style>
        </Helmet>
      </HelmetProvider>
    </div>
  );
}

export default App;