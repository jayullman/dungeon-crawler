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

  for (var i = 0; i < mapArray.length; i++) {
    for (var j = 0; j < mapArray[i].length; j++) {
      let tile = mapArray[i][j];
      newMap.push(
        <div key={i + ', ' + j} className="tile">{tile}</div>
      );
    }
    newMap.push(<br key={i + ', ' + j + ' br'} />);
  }
  return (
    <div className="map-container">

      {newMap}
    </div>
  );


}
