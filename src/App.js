import React, { Component } from 'react';
import './styles/App.css';

import listener from './keyboard_listeners';

const testMap = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentMap: testMap,
      heroRow: 0,
      heroCol: 0
    }

  }


  componentDidMount() {
    window.addEventListener("keydown", listener)
  }

  componentWillUnmount() {
    window.removeEventListner("keydown", listener)
  }

  render() {
    return (
      <div

        className="App">
        <div className="App-header">

          <h2>Dungeon Crawler</h2>
        </div>

      </div>
    );
  }
}

export default App;
