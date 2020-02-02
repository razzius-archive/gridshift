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
  microgrid: {
    display(state) {
      return state.microgrid ? DISPLAY : HIDE
    },
    displayName: 'Microgrid',
    x: 2,
    y: 3,
    actions() {
      return []
    }
  },
  fire: {
    display(state) {
      return state.disaster ? DISPLAY : HIDE
    },
    displayName: 'Fire',
    x: 0,
    y: 0,
    actions() {
      return []
    }
  },
  trimmedFoliage: {
    display(state) {
      return state.fireBreak ? DISPLAY : HIDE
    },
    displayName: 'Firebreak',
    x: 1,
    y: 1,
    actions() {
      return []
    }
  },
  foliage: {
    display(state) {
      if (state.fireBreak) {
        return HIDE
      }
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
      if (state.disaster) {
        return HIDE
      }
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
      if (state.microgrid) {
        return HIDE
      }
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
      const microgridAction = state.emptyField
        ? [
            {
              name: 'Petition for City Microgrid'
            }
          ]
        : []
      console.log(microgridAction)
      console.log(state)

      return [
        {
          name: 'Attend crisis preparedness presentation'
        },
        ...microgridAction
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
      return state.escapeRoute ? DISPLAY : UNEXPLORED
    },
    displayName: 'Escape Route',
    x: 4,
    y: 3,
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

    let newTime = state.time
    let newMoney = state.money
    let stateUpdate = {}
    if (action === 'explore') {
      stateUpdate = { [name]: true }
      this.setState({ selected: { name, x, y, mystery: false } })
    } else if (
      ['Trim foliage with axe', 'Hire contractor to trim'].includes(action.name)
    ) {
      stateUpdate = { ...stateUpdate, fireBreak: true }
    } else if (action.name === 'Petition for City Microgrid') {
      stateUpdate = { ...stateUpdate, microgrid: true }
    }
    newMoney = money - (action.cost == null ? 0 : action.cost)
    newTime = time - (action.time == null ? 1 : action.time)

    if (state.disaster && time <= 1) {
      alert("Time's up! Let's see how you did.")
      this.props.updateState({ done: true })
      return
    }
    if (time <= 1) {
      this.props.updateState({ disaster: true, time: 3 })
      return
    }

    this.props.updateState({ time: newTime, money: newMoney, ...stateUpdate })
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
          </div>
          <div className="active-location">
            <ActiveLocation
              selected={this.state.selected}
              handleAction={this.handleAction}
              state={this.props.state}
            />
          </div>
        </div>
      </div>
    )
  }
}

const ActiveLocation = ({ selected, handleAction, state }) => {
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
      {values.actions(state).map(action => {
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
