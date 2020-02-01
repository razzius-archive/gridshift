import React from 'react'

const Character = ({description, image, handleCharacterSelect}) => {
  return (
    <div className='character-container' onClick={handleCharacterSelect}>
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