import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Home from './Home'
import Game from './Game'
import Scorecard from './Scorecard'
import './App.css'

class App extends Component {

  handleCharacterSelect(e, idx) {
    console.log(idx);
  }

  render(){
    return (
      <Router>
        <div className="App">
          <Link to="/">Insert home logo here</Link>
          <Switch>
            <Route path="/game">
              <Game state={{cybertruck: true, gasVehicle: false, escapeRoute: true}}/>
            </Route>
            <Route path="/score">
              <Scorecard />
            </Route>
            <Route path="/">
              <Home 
                handleCharacterSelect={(e, idx) => this.handleCharacterSelect(e, idx)}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
