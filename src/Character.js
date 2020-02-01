import React from 'react'

const Character = ({description, image}) => {
  return (
    <div className='character-container'>
      <div className='character-image'>
        <img src={image} alt="character portrait"></img>
      </div>
      <div className='character-description'>
        {description}
      </div>
    </div>
  );
};

export default Character;