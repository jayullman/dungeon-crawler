// this screen will show when the game is first loaded
// it will explain the rules and objectives to the player

import React from 'react';

export default function(props) {

  return (
    <div>
      <div className="backdrop backdrop-instructions">
        <div className="instructions-window">

          <h1>Welcome to <br/>My Dungeon Crawler Game!</h1>
          <h4>This was a project built for the freeCodeCamp React and Data Viz Certification</h4>
          <h5>How to Play</h5>
          <p>
            The goal is to kill the boss! Unfortunately, he is locked in his
            room and you must first find the key to his door. You can only see
            as far as your torch allows. Pick up more torches to see farther.
          </p>
          <p>
            You can move around by using the arrow keys on your keyboard. You can
            fight monsters and pick up items by moving into them.
          </p>
          <p>
            As you kill monsters, you will gain experience. If you gain enough experience,
            you will level up, which will increase your max health, attack, and defense values. However,
            the monsters will also level up with you!
          </p>
          <p>
            The dungeon is randomly generated through the use of a recursive algorithm, so if you don't
            like this particular dungeon's layout, feel free to click the restart button :)
          </p>
          <h5>Item Glossary</h5>
          <dl className="item-glossary">
            <dt>Torch</dt>
            <dd>This will increase the distance you can see</dd>
            <dt>Weapon</dt>
            <dd>Indicated by the sword tile, this will increase your attack value</dd>
            <dt>Armor</dt>
            <dd>Indicated by the shield tile, this will increase your defense value</dd>
            <dt>Health Potion</dt>
            <dd>This will heal you</dd>
            <dt>Key</dt>
            <dd>This will let you into the Boss Room!</dd>


          </dl>

          <h5>
            View this projects source code on&nbsp;
            <a
              target="_blank"
              href="https://github.com/libeja/dungeon-crawler"
            >
              GitHub&nbsp;
              <i
                className="fa fa-github"
                aria-hidden="true"
              >
              </i>
            </a>
          </h5>

          <button
            className="btn btn-window"
            onClick={props.handleOKButton}
            >Got it!</button>
        </div>
      </div>
    </div>
  );
}
