import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './style/main.scss';
import SonnetView from './Views/SonnetView'
import HomeView from './Views/HomeView'
import PlayView from './Views/PlayView'
import ScratchView from './Views/ScratchView'
import { Header, Footer } from './components';

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Route path="/" component={Header} />
        <main role="main">
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
        </main>
        <Route path="/" component={Footer} />
      </Router>
    </div>
  );
}

export default App;
