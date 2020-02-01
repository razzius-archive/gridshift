import React from 'react'
import { Link } from 'react-router-dom'
import Character from './Character'

let characters = [
  {
    description: 'Retired Investment Banker from New York',
    image: ''
  },
  {
    description: 'Startup Founder who owns a Tesla Cybertruck',
    image: ''
  },
  {
    description: 'Working Mom with 2 kids living in an appartment',
    image: ''
  },
  {
    description: 'High School English Teacher who rides public transit',
    image: ''
  }
]

export default () => (
  

  <div>
    <h1>California Power Trail</h1>
    <h2>Choose Your Character</h2>
    
      {characters.map((character, idx) => (
        <Character
          key={idx}
          description={character.description}
          image={character.image}
        />
      ))}

    <Link to="/game">Start</Link>
  </div>
)
