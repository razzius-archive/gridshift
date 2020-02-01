import React from 'react'
// import { Link } from 'react-router-dom'
// import Character from './Character'

const state = { cybertruck: true }

export default () => {
  if (state.gameOver) {
    return 'GAME OVER!'
  }

  return (
    <div className="scorecard">
      <div>Score here</div>
      {state.cybertruck ? 'have cybertruck' : 'no cybertruck'}
    </div>
  )
}
