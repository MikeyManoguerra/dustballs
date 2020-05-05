import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './style/main.scss';
import SonnetView from './Views/SonnetView'
import HomeView from './Views/HomeView'
import PlayView from './Views/PlayView'
import ScratchView from './Views/ScratchView'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/sonnets">
          <SonnetView />
        </Route>
        <Route path="/plays">
          <PlayView />
        </Route>
        <Route path="/scratch">
          <ScratchView />
        </Route>
        <Route path="/">
          <HomeView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
