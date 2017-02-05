import React from 'react';

import {
  TILE_WALL,
  TILE_LOCKED_DOOR,
  TILE_HERO,
  TILE_MONSTER,
  TILE_BOSS,
  TILE_KEY,
  TILE_WEAPON,
  TILE_ARMOR,
  TILE_HEALTH,
  TILE_HIDDEN,
  TILE_TORCH,
  UP_KEY,
  RIGHT_KEY,
  DOWN_KEY,
  LEFT_KEY,
} from '../constant-values';


export default function Map(props) {
  const mapArray = props.map;

  let newMap = [];
  let color = null;
  // TODO: remove hard coded colors
  for (var i = 0; i < mapArray.length; i++) {
    for (var j = 0; j < mapArray[i].length; j++) {
      let tile = mapArray[i][j];
      if (tile === TILE_HIDDEN) {
        color = '#333';
      } else if (tile === TILE_WALL) {
        color = "#888";
      } else {
        color = null;
      }

      // TODO: figure out how to make div float above hero
      let heroDamageStyle = null;
      let monsterDamagerStyle = null;
      // if damage indicators should be displayed
      if (props.showDamage) {
        if (tile === TILE_HERO) {
          if (props.lastMoveDirection === UP_KEY) {
            // TODO
          } else if (props.lastMoveDirection === RIGHT_KEY) {
            // TODO
          } else if (props.lastMoveDirection === DOWN_KEY) {
            // TODO

          } else if (props.lastMoveDirection === LEFT_KEY) {
            // TODO

          }



          console.log(heroDamageStyle);
        }
      }
      let tileToAdd;

        tileToAdd = <div
          // TODO: remove hard coding
          style={{backgroundColor: color}}
          key={i + ', ' + j}
          id={i + ', '+ j}
          className="tile"
        >
          {/* TODO: remove this, add to monster tile somehow */}
          {i === 0 & j === 0
            ? <div className="damage-readout damage-readout-monster"></div>
            : null
          }


          {/* if props.showDamage === true,
              add div to sprite div to display damage
            */}
          {tile === TILE_HERO
            ? <div
                key={i + ', ' + j}
                id={i + ', '+ j}
                className="sprite tile-hero"
              >
                {props.showDamage
                  ? <div
                      style={heroDamageStyle}
                      className="damage-readout damage-readout-hero"
                    >
                      {props.damageFromMonster}
                    </div>
                  : null}
              </div>
            : tile === TILE_BOSS
              ? <div
                key={i + ', ' + j}
                id={i + ', '+ j}
                className="sprite tile-boss"
              />

            : tile === TILE_MONSTER
              ? <div
                key={i + ', ' + j}
                id={i + ', '+ j}
                className="sprite tile-monster"
                />

            : tile === TILE_KEY
              ? <div
                key={i + ', ' + j}
                id={i + ', '+ j}
                className="sprite tile-key"
                />

            : tile === TILE_WEAPON
              ? <div
                key={i + ', ' + j}
                id={i + ', '+ j}
                className="sprite tile-weapon"
                />

            : tile === TILE_ARMOR
              ? <div
                key={i + ', ' + j}
                id={i + ', '+ j}
                className="sprite tile-armor"
                />

            : tile === TILE_TORCH
              ? <div
                key={i + ', ' + j}
                id={i + ', '+ j}
                className="sprite tile-torch"
                />

            : tile === TILE_HEALTH
              ? <div
                key={i + ', ' + j}
                id={i + ', '+ j}
                className="sprite tile-health"
                />

            : tile === TILE_LOCKED_DOOR
              ? <div
                key={i + ', ' + j}
                id={i + ', '+ j}
                className="sprite tile-locked-door"
                />

            : null


        }

        </div>


      newMap.push(tileToAdd);
    }
    newMap.push(<br key={i + ', ' + j + ' br'} />);
  }

  return (
    <div className="map-container">
      {/* {mapArray.length === 0 ? <p>Loading...</p> : {newMap}} */}
      {newMap}
    </div>
  );


}
