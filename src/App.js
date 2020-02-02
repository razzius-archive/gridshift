import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Home from './Home'
import Game from './Game'
import Scorecard from './Scorecard'
import './App.css'

class App extends Component {

  state = {
    axe: false,
    batteries: false,
    campingGear: false,
    cybertruck: false,
    emptyField: false,
    escapeRoute: false,
    firebreak: false,
    foliage: false,
    gasVehicle: false,
    house: true,
    mask: false,
    microgrid: false,
    neighbor: false,
    school: false,
    solar: false,
    store: true,
    townEvacuationPlanForEveryone: false,
    townHall: true,
    fireDisaster: true,
  }

  handleCharacterSelect(e, idx) {
    switch(idx) {
      case 0:
        // Old Rich
        let oldRichState = {...this.state}
        oldRichState.mercedes=true
        oldRichState.money = 100
        this.setState(oldRichState)
        break
      case 1:
        // Young Rich
        let youngRichState = {...this.state}
        youngRichState.cybertruck=true
        youngRichState.money = 75
        this.setState(youngRichState)
        break
      case 2:
        // Young Poor
        let youngPoorState = {...this.state}
        youngPoorState.minivan = true
        youngPoorState.money = 50
        youngPoorState.neighbors = true
        this.setState(youngPoorState)
        break
      case 3:
        // Old Poor
        let oldPoorState = {...this.state}
        oldPoorState.money = 50
        oldPoorState.neighbors = true
        oldPoorState.axe = true
        this.setState(oldPoorState)
        break
      default:
        // code block
    }
  }

  render(){
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/game">
              <Game state={this.state}/>
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
