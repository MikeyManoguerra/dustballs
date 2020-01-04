import React from 'react';
import './App.scss';
import SonnetsDisplay from './components/sonnets'

const App: React.FC = () => {
  return (
    <div className="App">
       <SonnetsDisplay />
    </div>
  );
}

export default App;
