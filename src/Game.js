import React from 'react'
import { CSSTransition } from 'react-transition-group'

// x and y are on a 8 by 6 grid. Decimals allowed
const GAME_WIDTH = 800
const GAME_HEIGHT = 600

const X_UNITS = 8
const Y_UNITS = 6

const UNIT_WIDTH = GAME_WIDTH / X_UNITS
const UNIT_HEIGHT = GAME_HEIGHT / Y_UNITS

const GAME_OBJECTS = {
  cybertruck: {
    displayName: 'Tesla Cybertruck™',
    x: 3,
    y: 2.5
  },
  gasVehicle: {
    displayName: 'Ford F150™',
    x: 3,
    y: 2
  },
  escapeRoute: {
    displayName: 'Escape Route',
    x: 5,
    y: 4
  }
}

function gameObjectValues(name) {
  const match = GAME_OBJECTS[name]

  if (match) {
    return match
  }

  throw Error(`No game text for object '${name}'`)
}

const GameObject = ({ name }) => {
  const values = gameObjectValues(name)
  const displayX = values.x * UNIT_WIDTH
  const displayY = values.y * UNIT_HEIGHT

  return (
    <div
      className={`game-object ${name}`}
      ariaLabel={values.displayName}
      style={{
        left: `${displayX}px`,
        top: `${displayY}px`,
        backgroundImage: `url(${name}.jpg)`
      }}
    />
  )
}

export default class Game extends React.Component {
  state = {
    inProp: false
  }

  render() {
    const { state } = this.props
    return (
      <div>
        <button onClick={() => this.setState({ inProp: true })}>
          make it go
        </button>
        <div>game state: {JSON.stringify(state)}</div>
        <div className="game-window">
          <CSSTransition
            in={this.state.inProp}
            timeout={5000}
            classNames="transition"
          >
            <div className="thingy">transition-in and stuff</div>
          </CSSTransition>
          {state.cybertruck && <GameObject name="cybertruck" />}
          {state.gasVehicle && <GameObject name="gasVehicle" />}
          {state.escapeRoute && <GameObject name="escapeRoute" />}
        </div>
      </div>
    )
  }
}
