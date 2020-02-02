import React from 'react'

// x and y are on a 5 by 6 grid. Decimals allowed
const GAME_WIDTH = 500
const GAME_HEIGHT = 600

const X_UNITS = 5
const Y_UNITS = 6

const UNIT_WIDTH = GAME_WIDTH / X_UNITS
const UNIT_HEIGHT = GAME_HEIGHT / Y_UNITS

const DISPLAY = 'DISPLAY'
const UNEXPLORED = 'UNEXPLORED'
const HIDE = 'HIDE'

const GAME_OBJECTS = {
  foliage: {
    display(state) {
      return state.foliage ? DISPLAY : UNEXPLORED
    },
    displayName: 'Foliage',
    x: 1,
    y: 1,
    actions(state) {
      const trimOption = state.axe
        ? [
            {
              name: 'Trim foliage with axe',
              cost: 0,
              time: 2
            }
          ]
        : []

      return [
        {
          name: 'Hire contractor to trim',
          cost: 500,
          time: 0
        },
        ...trimOption
      ]
    }
  },
  store: {
    display(state) {
      return DISPLAY
    },
    displayName: 'General Store',
    x: 0,
    y: 0,
    actions(state) {
      if (state.disaster) {
        return []
      }

      return [
        {
          name: 'Buy Axe'
        }
      ]
    }
  },
  neighbor: {
    display(state) {
      return state.neighbor ? DISPLAY : UNEXPLORED
    },
    displayName: "Neighbor's House",
    x: 3,
    y: 1,
    actions(state) {
      return [
        {
          name: 'Check in with neighbor'
        }
      ]
    }
  },
  emptyField: {
    display(state) {
      return state.emptyField ? DISPLAY : UNEXPLORED
    },
    displayName: 'Empty Field',
    x: 2,
    y: 3,
    actions(state) {
      return [
        {
          name: 'Look wistfully at field'
        }
      ]
    }
  },
  school: {
    display(state) {
      return state.school ? DISPLAY : UNEXPLORED
    },
    displayName: 'School',
    x: 3,
    y: 3,
    actions(state) {
      return []
    }
  },
  townHall: {
    display(state) {
      return DISPLAY
    },
    displayName: 'Town Hall',
    x: 4,
    y: 0,
    actions(state) {
      return [
        {
          name: 'Attend crisis preparedness presentation'
        },
        {
          name: 'Petition for City Microgrid'
        }
      ]
    }
  },
  cybertruck: {
    display(state) {
      return state.cybertruck ? DISPLAY : HIDE
    },
    displayName: 'Tesla Cybertruck™',
    x: 2,
    y: 2,
    actions(state) {
      return []
    }
  },
  house: {
    display() {
      return DISPLAY
    },
    displayName: 'Your House',
    x: 2,
    y: 1,
    actions(state) {
      return [
        {
          name: 'Buy solar',
          cost: 10000,
          time: 3
        },
        {
          name: 'Buy battery',
          cost: 20000,
          time: 2
        }
      ]
    }
  },
  // gasVehicle: {
  //   displayName: 'Ford F150™',
  //   x: 2,
  //   y: 2,
  //   actions: []
  // },
  escapeRoute: {
    display(state) {
      return state.escapeRoute ? DISPLAY : HIDE
    },
    displayName: 'Escape Route',
    x: 4,
    y: 3,
    actions() {
      return []
    }
  },
  fire: {
    display(state) {
      return state.disaster ? DISPLAY : HIDE
    },
    displayName: 'Fire!!!',
    x: 0,
    y: 0,
    actions() {
      return []
    }
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
        setSelected({ name, x, y, mystery })
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
    selected: null
  }

  setSelected = ({ name, x, y, mystery }) => {
    this.setState({ selected: { name, x, y, mystery } })
  }

  handleAction = ({ action, name, x, y }) => {
    const { state } = this.props
    const { time, money } = state
    if (action === 'explore') {
      this.props.updateState({ [name]: true, time: time - 1 })
      this.setState({ selected: { name, x, y, mystery: false } })
      if (time <= 0) {
        this.props.updateState({ disaster: true, time: 5 })
      }
    } else {
      const newMoney = money - (action.cost == null ? 0 : action.cost)
      this.props.updateState({ time: time - 1, money: newMoney })
    }
  }

  render() {
    const { state } = this.props
    const gameObj = name => {
      const values = gameObjectValues(name)

      const selected =
        this.state.selected !== null &&
        this.state.selected.x === values.x &&
        this.state.selected.y === values.y

      const display = values.display(state)
      if (display === HIDE) {
        return null
      } else if (display === UNEXPLORED) {
        return (
          <GameObject
            key={name}
            name={name}
            mystery
            displayName="Unexplored"
            x={values.x}
            y={values.y}
            setSelected={this.setSelected}
            selected={selected}
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
          selected={selected}
        />
      )
    }

    const objects = Object.keys(GAME_OBJECTS).map(name => gameObj(name))

    return (
      <div>
        <div className="game">
          <div className="inventory">
            Inventory
            <img src="phone.jpg" className="phone" alt="phone background" />
            <p>Time: {state.time}</p>
            <p>Money: {state.money}</p>
            <p>{state.axe && 'Axe'}</p>
          </div>
          <div className="game-map">
            <div className="thingy">transition-in and stuff</div>
            {objects}
            {this.state.disaster && <gameObj name="fire" />}
          </div>
          <div className="active-location">
            <ActiveLocation
              selected={this.state.selected}
              handleAction={this.handleAction}
            />
          </div>
        </div>
      </div>
    )
  }
}

const ActiveLocation = ({ selected, handleAction }) => {
  if (selected === null) {
    return null
  }

  const { x, y, name, mystery } = selected

  if (mystery) {
    return (
      <div>
        <h3>Unexplored</h3>
        <button
          onClick={() => {
            handleAction({ action: 'explore', name, x, y })
          }}
        >
          Explore
        </button>
      </div>
    )
  }

  const values = GAME_OBJECTS[name]

  // todo use state to know actions
  return (
    <div>
      <h3>{values.displayName}</h3>
      {values.actions({}).map(action => {
        return (
          <div key={action.name}>
            <button onClick={() => handleAction({ action, name, x, y })}>
              {action.name}
            </button>
          </div>
        )
      })}
    </div>
  )
}
