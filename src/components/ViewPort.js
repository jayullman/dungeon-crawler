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

import heroSpriteSheet from '../assets/hero.png';


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

      let heroDamageStyle = {};
      let monsterDamageStyle = {};

      // use this sprite image for here. Alter position for different
      // movement directions
      let heroSpriteImg = {}
      // if damage indicators should be displayed
      // depending on which was the last direction moved will indicate
      // where the monster is located. Positions damage indicator accordinglu

      if (tile === TILE_HERO) {
        if (props.lastMoveDirection === UP_KEY) {
          heroSpriteImg = {background: 'url(' + heroSpriteSheet + ') 0 47px'};

          if (props.showDamage) {
          heroDamageStyle = {top: '0px', left: '40px'};
          monsterDamageStyle = {top: '-50px', left: '20px'};
        }

        } else if (props.lastMoveDirection === RIGHT_KEY) {
          heroSpriteImg = {background: 'url(' + heroSpriteSheet + ') 0 -96px'};

          if (props.showDamage) {
          monsterDamageStyle = {top: '-15px', left: '40px'};
          heroDamageStyle = {left: '-10px'};
        }

        } else if (props.lastMoveDirection === DOWN_KEY) {
          heroSpriteImg = {background: 'url(' + heroSpriteSheet +') 0 0'}

          if (props.showDamage) {
          monsterDamageStyle = {top: '40px', left: '40px'};
        }

        } else if (props.lastMoveDirection === LEFT_KEY) {
          heroSpriteImg = {background: 'url(' + heroSpriteSheet + ') 0 -48px'};

          if (props.showDamage) {
          monsterDamageStyle = {top: '-15px', left: '-30px'};
          heroDamageStyle = {left: '10px'};
        }

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


          {/* if props.showDamage === true,
              add div to sprite div to display damage
            */}
          {tile === TILE_HERO
            ? <div
                key={i + ', ' + j}
                id={i + ', '+ j}
                className="sprite tile-hero"
                style={heroSpriteImg}
              >
                {props.showDamage
                  ? <div
                      style={heroDamageStyle}
                      className="damage-readout damage-readout-hero"
                    >
                      - {props.damageFromMonster}
                    </div>
                  : null}

                  {props.showDamage
                    ? <div
                        style={monsterDamageStyle}
                        className="damage-readout damage-readout-monster"
                      >
                        {props.monsterCurrentHealth}
                         &nbsp;/ {props.monsterMaxHealth}
                    </div>
                    : null
                  }

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
