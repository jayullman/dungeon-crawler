// component will be an overlay 'you died' screen
// will ask if the player wants to play again

import React from 'react';

export default function(props) {

  return (
    <div>
      <div className="backdrop backdrop-dead">  </div>
        <div className="game-lost-window">

          <p>YOU DIED!</p>
          <button
            className="btn-window"
            onClick={props.handlePlayAgainButton}
            >Play Again?</button>
        </div>
    </div>
  )

}
