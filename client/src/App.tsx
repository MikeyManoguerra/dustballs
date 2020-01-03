import React from 'react';
import logo from './logo.svg';
import './App.css';
import SonnetsDisplay from './components/sonnets'

const App: React.FC = () => {
  return (
    <div className="App">
       <SonnetsDisplay />
    </div>
  );
}

export default App;
