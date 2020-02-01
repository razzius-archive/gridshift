import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Home from './Home'
import Game from './Game'
import Scorecard from './Scorecard'
import './App.css'

class App extends Component {

  state = {
    cybertruck: true,
    solar: true,
    batteries: false,
    microgrid: false,
    firebreak: false,
    mask: false,

    wasFire: true,
    townEvacuationPlanForEveryone: false
  }

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
              <Game state={{
                cybertruck: true,
                gasVehicle: false,
                escapeRoute: false,
                house: true,
                school: false,
                emptyField: false,
                townHall: true,
                microgrid: false,
                neighbor: false,
              }}/>
            </Route>
            <Route path="/score">
              <Scorecard 
                gameState={this.state}
              />
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
