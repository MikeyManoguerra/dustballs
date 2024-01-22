import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './style/main.scss';
import SonnetPage from './pages/SonnetPage'
import HomePage from './pages/HomePage'
import PlayPage from './pages/PlayPage'
import ScratchPage from './pages/ScratchPage'

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/sonnets">
            <SonnetPage />
          </Route>
          <Route path="/plays">
            <PlayPage />
          </Route>
          <Route path="/scratch">
            <ScratchPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
