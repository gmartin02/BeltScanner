import whiteBelt from './whiteBelt.png';
import './App.css';
import Scanner from './Components/Scanner';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={whiteBelt} className="ninjaHead"/>
        <p>
          Scan your belt Ninja!
        </p>
        <Scanner />

      </header>
    </div>
  );
}

export default App;
