import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Game from './Game';
import Opponent from './Opponent';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/opponent" component={Opponent}>
            </Route>
            <Route path="/" component={Game}>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  } 
}

export default App;