import React from 'react';

export default function Header(props) {

  return (
    <div className="App-header">
      <h1 className="title">Dungeon Crawler</h1>
      <button
        onClick={props.handleRegenerateMapButton}
        className="btn btn-regenerate"
      >
        <i className="fa fa-refresh" aria-hidden="true"></i> Regenerate Map
      </button>

    </div>
  );

}
