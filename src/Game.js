import React from 'react'
import { CSSTransition } from 'react-transition-group'

// x and y are on a 8 by 6 grid. Decimals allowed
const GAME_WIDTH = 500
const GAME_HEIGHT = 600

const X_UNITS = 5
const Y_UNITS = 6

const UNIT_WIDTH = GAME_WIDTH / X_UNITS
const UNIT_HEIGHT = GAME_HEIGHT / Y_UNITS

const GAME_OBJECTS = {
  neighbor: {
    displayName: "Neighbor's House",
    x: 1,
    y: 2
  },
  emptyField: {
    displayName: 'Empty Field',
    x: 2,
    y: 4
  },
  school: {
    displayName: 'School',
    x: 3,
    y: 4
  },
  townHall: {
    displayName: 'Town Hall',
    x: 4,
    y: 0
  },
  cybertruck: {
    displayName: 'Tesla Cybertruck™',
    x: 2,
    y: 3
  },
  house: {
    displayName: 'Your House',
    x: 2,
    y: 2,
    actions: ['Buy solar', 'Buy battery']
  },
  gasVehicle: {
    displayName: 'Ford F150™',
    x: 3,
    y: 1
  },
  escapeRoute: {
    displayName: 'Escape Route',
    x: 4,
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

const GameObject = ({
  name,
  displayName,
  mystery = false,
  x,
  y,
  setSelected,
  selected
}) => {
  const displayX = x * UNIT_WIDTH
  const displayY = y * UNIT_HEIGHT

  const imageUrl = mystery ? 'questionMark.jpg' : `${name}.jpg`

  return (
    <div
      onClick={e => {
        console.log(e)
        setSelected(name)
      }}
      className={`game-object ${name} ${selected ? 'selected' : ''}`}
      aria-label={displayName}
      style={{
        left: `${displayX}px`,
        top: `${displayY}px`,
        backgroundImage: `url(${imageUrl})`
      }}
    />
  )
}

export default class Game extends React.Component {
  state = {
    inProp: false,
    selected: null
  }

  setSelected = name => {
    this.setState({ selected: name })
  }

  render() {
    const { state } = this.props

    const gameObj = name => {
      const values = gameObjectValues(name)

      if (!this.props.state[name]) {
        const name = `questionMark${values.x}${values.y}`

        return (
          <GameObject
            key={name}
            name={name}
            mystery
            displayName="Unexplored"
            x={values.x}
            y={values.y}
            setSelected={this.setSelected}
            selected={name === this.state.selected}
          />
        )
      }

      return (
        <GameObject
          key={name}
          name={name}
          displayName={values.displayName}
          x={values.x}
          y={values.y}
          setSelected={this.setSelected}
          selected={name === this.state.selected}
        />
      )
    }

    const objects = Object.keys(GAME_OBJECTS).map(name => gameObj(name))

    return (
      <div>
        <button onClick={() => this.setState({ inProp: true })}>
          make it go
        </button>
        <div>game state: {JSON.stringify(state)}</div>
        <div className="game">
          <div className="inventory">
            Inventory
            <img src="phone.jpg" className="phone" alt="phone background" />
          </div>
          <div className="game-map">
            <CSSTransition
              in={this.state.inProp}
              timeout={5000}
              classNames="transition"
            >
              <div className="thingy">transition-in and stuff</div>
            </CSSTransition>
            {objects}
          </div>
          <div className="active-location">
            <ActiveLocation selected={this.state.selected} />
          </div>
        </div>
      </div>
    )
  }
}

const ActiveLocation = ({ selected }) => {
  if (selected === null) {
    return null
  }

  if (!(selected in GAME_OBJECTS)) {
    return 'Unexplored'
  }

  return GAME_OBJECTS[selected].displayName
}
