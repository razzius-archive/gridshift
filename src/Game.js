import React from 'react'

const GAME_WIDTH = 800
const GAME_HEIGHT = 600

// x and y are on a 16 by 12 grid. Decimals allowed
const GAME_OBJECTS = {
  cybertruck: {
    displayName: 'Tesla Cybertruck™',
    x: 5,
    y: 5
  },
  gasVehicle: {
    displayName: 'Ford F150™',
    x: 6,
    y: 5
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
  const widthRatio = values.x / 16
  const displayX = widthRatio * GAME_WIDTH
  const heightRatio = values.y / 12
  const displayY = heightRatio * GAME_HEIGHT

  return (
    <div
      className={`game-object ${name}`}
      style={{ left: `${displayX}px`, top: `${displayY}px` }}
    >
      {values.displayName}
    </div>
  )
}

export default class Game extends React.Component {
  render() {
    const { state } = this.props
    return (
      <div>
        <div>game state: {JSON.stringify(state)}</div>
        <div className="game-window">
          {state.cybertruck && <GameObject name="cybertruck" />}
          {state.gasVehicle && <GameObject name="gasVehicle" />}
        </div>
      </div>
    )
  }
}
