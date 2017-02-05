// this component will be an overlay showing that the player won

import React from 'react';

export default function(props) {

  return (
    <div>
      <div className="backdrop-won">  </div>
        <div className="game-won-window">

          <p>WON!</p>
          <button
            className="btn-window"
            onClick={props.handlePlayAgainButton}
            >Play Again?</button>
        </div>




    </div>
  )

}
