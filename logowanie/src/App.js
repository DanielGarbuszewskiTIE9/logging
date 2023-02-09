import logo from './logo.svg';
import './App.css';
import AddUser from './components/AddUser';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
        </a>
      </header>
      <AddUser/>
    </div>
  );
}

export default App;
