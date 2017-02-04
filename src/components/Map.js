import React, { Component } from 'react';

import {
  TILE_WALL,
  TILE_ROOM,
  TILE_HERO,
  TILE_MONSTER,
  TILE_BOSS,
  TILE_KEY,
  TILE_ITEM,
  TILE_HEALTH
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
  let color;
  // TODO: remove hard coded colors
  for (var i = 0; i < mapArray.length; i++) {
    for (var j = 0; j < mapArray[i].length; j++) {
      let tile = mapArray[i][j];
      if (tile === TILE_WALL) {
        color = "#888";
      } else if (tile === TILE_HERO) {
        color = "blue";
      } else if (tile === TILE_BOSS) {
        color = "red";
      } else if (tile === TILE_MONSTER) {
        color = "pink";
      } else if (tile === TILE_KEY) {
        color = "yellow";
      } else if (tile === TILE_ITEM) {
        color = "purple";
      } else if (tile === TILE_HEALTH) {
        color = "green";
      } else {
        color = null;
      }
      newMap.push(
        <div
          // TODO: remove hard coding
          style={{backgroundColor: color}}
          key={i + ', ' + j}
          id={i + ', '+ j}
          className="tile">{tile}</div>
      );
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
