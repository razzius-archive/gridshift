import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Home from './Home'
import Game from './Game'
import Select from './Select'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/">Insert home logo here</Link>
        <Switch>
          <Route path="/select">
            <Select />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
