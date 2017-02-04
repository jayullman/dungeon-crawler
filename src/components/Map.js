import React, { Component } from 'react';




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
      if (tile === 1) {
        color = "#888";
      } else if (tile === 9) {
        color = "blue";
      } else if (tile === 8) {
        color = "red";
      } else if (tile === 7) {
        color = "pink";
      } else if (tile === 11) {
        color = "yellow";
      } else if (tile === 10) {
        color = "purple";
      } else if (tile === 6) {
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
