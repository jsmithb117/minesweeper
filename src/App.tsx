import './App.css';
import Rows from './components/Rows';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RootState } from './features/store';
import { useAppSelector } from './features/hooks';


function App() {
  document.addEventListener('contextmenu', event => event.preventDefault());
  const win = useAppSelector((state: RootState) => state.click.win);
  const loss = useAppSelector((state: RootState) => state.click.loss);

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