import React from 'react'
// import { Link } from 'react-router-dom'
// import Character from './Character'

const state = {
    cybertruck: true,
    solar: true,
    batteries: false,
    microgrid: false,
    firebreak: false,
    mask: false,

    wasFire: true,
    townEvacuationPlanForEveryone: false
}

export default () => {
//  if (state.gameOver) {
//    return 'GAME OVER!'
//  }

  const hadPowerAtHome = state.solar && state.batteries;
  const hadPowerInTown = hadPowerAtHome || state.microgrid;
  const couldEvacuate = (state.cybertruck && (hadPowerAtHome || hadPowerInTown)) || (state.gasolinecar && hadPowerInTown) || state.townEvacuationPlanForEveryone;

  return (
    <div className="scorecard">
          <div><h1>Your family survived!</h1></div>
          <div align="left">Your Home</div>
          <ul>
          <li>{state.solar ? (state.batteries ?
              "Your home had power because you bought solar and batteries." :
              "Your home has solar, but doesn't have batteries.  Solar needs batteries to work in a power outage.") :
              "Your home didn't have any power." }</li>
          <li>{state.wasFire ?
                  (state.firebreak ? "Your home was protected from the fire." : "Your home burnt down during the fire.") :
              ""}</li>
          <li>{state.wasFire && couldEvacuate ? "Your family could leave town if the fire was out of control." :
                  state.wasFire ? "Your family could not evacuate the town, if the fire became out of control.  The gas station requires power to pump gas, and electric cars require home generation or a microgrid." : ""}</li>
          </ul>

          <div align="left">Food</div>
          <li>{state.hadNonPerishableFood ? "Your family had canned goods and could eat." : "Your family went to bed hungry each night." }</li>

          <div align="left">Health Impacts</div>
          {state.hadMask && state.wasFire ? "Your particulate mask helped keep you healthy from smoke exposure." : "No medical problems came up."}
      </div>
  )
}
