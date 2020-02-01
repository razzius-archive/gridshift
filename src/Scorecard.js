import React from 'react'

export default (props) => {
//  if (state.gameOver) {
//    return 'GAME OVER!'
//  }

  const hadPowerAtHome = props.gameState.solar && props.gameState.batteries;
  const hadPowerInTown = hadPowerAtHome || props.gameState.microgrid;
  const couldEvacuate = (props.gameState.cybertruck && (hadPowerAtHome || hadPowerInTown)) || (props.gameState.gasolinecar && hadPowerInTown) || props.gameState.townEvacuationPlanForEveryone;

  return (
    <div className="scorecard">
        <div><h1>Your family survived!</h1></div>
            <div align="left">Your Home</div>
            <ul>
                <li>{props.gameState.solar ? (props.gameState.batteries ?
                    "Your home had power because you bought solar and batteries." :
                    "Your home has solar, but doesn't have batteries!  Solar needs batteries to work in a power outage.  It's great for the environment when you have power, but useless in a power outage unless you have energy storage.") :
                    "Your home didn't have any power."}</li>
                <li>{props.gameState.wasFire ?
                    (props.gameState.firebreak ? "Your home was protected from the fire." : "Your home burnt down during the fire.") :
                    ""}</li>
                <li>{props.gameState.wasFire && couldEvacuate ? "Your family could leave town if the fire was out of control." :
                    props.gameState.wasFire ? "Your family could not evacuate the town, if the fire became out of control.  The gas station requires power to pump gas, and electric cars require home generation or a microgrid." : ""}</li>
            </ul>

            <div align="left">Food</div>
            {props.gameState.hadNonPerishableFood ? "Your family had canned goods and could eat." : "Your food spoiled.  Your family went to bed hungry each night."}

            <div align="left">Health Impacts</div>
            <ul>
              <li>{props.gameState.hadMask && props.gameState.wasFire ? "Your particulate mask helped keep you healthy from smoke exposure." : "No medical problems came up."}</li>
            </ul>

            <div align="left">Your community</div>
            <ul>
                <li>{hadPowerInTown ? "Your town had power." : "Your town did not have power."}</li>
            </ul>
        </div>
    )

    //<li>{props.gameState.neighborsRescued ? "Your neighbors were able to evacuate and are safe" : "Your neighbors might be stuck at home."}</li>
}
