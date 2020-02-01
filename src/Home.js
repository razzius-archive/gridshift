import React from 'react'
import { Link } from 'react-router-dom'
import Character from './Character'

let characters = [
  {
    description: 'Retired Investment Banker from New York',
    image: 'https://placebear.com/300/300'
  },
  {
    description: 'Startup Founder who owns a Tesla Cybertruck',
    image: 'https://placebear.com/300/300'
  },
  {
    description: 'Working Mom with 2 kids living in an appartment',
    image: 'https://placebear.com/300/300'
  },
  {
    description: 'High School English Teacher who rides public transit',
    image: 'https://placebear.com/300/300'
  }
]

export default () => (
  

  <div className="home-main">
    <h1>California Power Trail</h1>
    <h2>Choose Your Character</h2>
    <div className="home-body">
      {characters.map((character, idx) => (
        <Character
          key={idx}
          description={character.description}
          image={character.image}
        />
      ))}
    </div>
    <Link to="/game">Start</Link>
  </div>
)
