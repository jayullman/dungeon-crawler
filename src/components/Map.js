import React, { Component } from 'react';

import heroImage from '../assets/hero.png'

import {
  TILE_WALL,
  TILE_ROOM,
  TILE_BOSS_ROOM,
  TILE_HERO,
  TILE_MONSTER,
  TILE_BOSS,
  TILE_KEY,
  TILE_WEAPON,
  TILE_ARMOR,
  TILE_HEALTH,
  TILE_HIDDEN,
  TILE_TORCH
} from '../constant-values';


export default function Map(props) {
  const mapArray = props.map;
  // rows will be an array of <div> elements
  // let rows = [];
  // let key = 2;
  //
  // for (let i = 0; i < mapArray.length; i++) {
  //   let row = mapArray[i].map(tile => {
  //
  //     return <div key={i} className="tile">{tile}</div>
  //   });
  //   rows.push(row);
  //   rows.push(<br/>);
  // }

  let newMap = [];
  let color = null;
  let className = 'tile';
  let backgroundImage = null;
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

      let tileToAdd;

      // if (tile === TILE_HERO) {
      //   tileToAdd = <div
      //     // TODO: remove hard coding
      //     style={{backgroundColor: color}}
      //     key={i + ', ' + j}
      //     id={i + ', '+ j}
      //     className="tile">
      //   >
      //     <div
      //       key={i + ', ' + j}
      //       id={i + ', '+ j}
      //       className="sprite"/>
      //   </div>
      //
      //
      // } else {
        tileToAdd = <div
          // TODO: remove hard coding
          style={{backgroundColor: color}}
          key={i + ', ' + j}
          id={i + ', '+ j}
          className="tile"
        >
          {tile === TILE_HERO
            ? <div
                key={i + ', ' + j}
                id={i + ', '+ j}
                className="sprite tile-hero"
              />
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
