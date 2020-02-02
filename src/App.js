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
    disaster: false,
    emptyField: false,
    escapeRoute: false,
    fireDisaster: true,
    firebreak: false,
    foliage: false,
    gasVehicle: false,
    house: true,
    mask: false,
    microgrid: false,
    neighbor: false,
    phoneBattery: 8,
    school: false,
    solar: false,
    store: true,
    time: 6,
    money: 5000,
    townEvacuationPlanForEveryone: false,
    townHall: true,
  }

  handleCharacterSelect(e, idx) {
    switch(idx) {
      case 0:
        // Old Rich
        let oldRichState = {...this.state}
        oldRichState.mercedes=true
        oldRichState.money = 100000
        this.setState(oldRichState)
        break
      case 1:
        // Young Rich
        let youngRichState = {...this.state}
        youngRichState.cybertruck=true
        youngRichState.money = 50000
        this.setState(youngRichState)
        break
      case 2:
        // Young Poor
        let youngPoorState = {...this.state}
        youngPoorState.minivan = true
        youngPoorState.money = 2000
        youngPoorState.neighbors = true
        this.setState(youngPoorState)
        break
      case 3:
        // Old Poor
        let oldPoorState = {...this.state}
        oldPoorState.money = 4000
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
          <div>
            <Link to="/">
              <img src="/simGriddy.png" alt="Sim Griddy Logo"/>
            </Link>
          </div>
          <Switch>
            <Route path="/game">
              <Game state={this.state} updateState={(state) => this.setState(state)}/>
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
