import React, { Component } from 'react';
import './styles/App.css';
import Map from './components/Map';

// import listener from './keyboard_listeners';
import * as helpers from './helpers';

import generateRooms from './generateRooms';

const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;
const LEFT_KEY = 37;


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

    do {
    this.testMap = generateRooms();
  } while (this.testMap.length === 0);

    this.state = {
      originalMap: testMap,
      currentMap: testMap,
      heroPosition: {
        row: 0,
        col: 0
      },
      tileUnderHero: 0,
      // monsters property will hold an array of monster objects which
      // will describe their type, health, and map location
      monsters: []
    }
    // TODO: set up initial boss positioning
    //bossPosition: {}

    // NOTE: Test map, remove
    // TEST MAP

  }

listener = (event) => {

    // ignore non-valid key inputs
    if (event.keyCode !== UP_KEY
      && event.keyCode !== RIGHT_KEY
      && event.keyCode !== DOWN_KEY
      &&  event.keyCode !== LEFT_KEY) {
          return;
        }
    let newPosition;
    let nextPosition;
    let newMapArray = [];
    switch (event.keyCode) {

      case UP_KEY:
        nextPosition = helpers.getUpPosition(this.state.heroPosition, this.state.currentMap);
        break;

      case RIGHT_KEY:
        nextPosition = helpers.getRightPosition(this.state.heroPosition, this.state.currentMap);
        break;

      case DOWN_KEY:
        nextPosition = helpers.getDownPosition(this.state.heroPosition, this.state.currentMap);
        break;

      case LEFT_KEY:
        nextPosition = helpers.getLeftPosition(this.state.heroPosition, this.state.currentMap);
        break;

      default:
        break;

    }

    if (helpers.isSpaceValid(nextPosition, this.state.currentMap)) {
      newPosition = nextPosition;
    } else {
      newPosition = this.state.heroPosition
    }

    if (newPosition.row !== this.state.heroPosition.row
      || newPosition.col !== this.state.heroPosition.col) {

        newMapArray = helpers.moveHero(this.state.currentMap, this.state.heroPosition, newPosition, this.state.tileUnderHero);
        this.setState({
          currentMap: newMapArray,
          heroPosition: newPosition
        });
      }

  }




  componentDidMount() {
    window.addEventListener("keydown", this.listener);

    // place monsters and hero characters
    // let newMap = helpers.placeCharacters(this.state.currentMap);
    // this.setState({currentMap: newMap})
    const heroPosition = helpers.placeHero(this.state.currentMap);

    let newMap = this.state.currentMap;
    newMap[heroPosition.row][heroPosition.col] = 2;

    // number of monsters on the board
    const monsterNumber = 3
    let monstersArray = [];

    // create initial array of monsters
    monstersArray = helpers.createMonsters(monsterNumber, newMap);
    // place monsters on map
    newMap = helpers.placeMonsters(monstersArray, newMap);

    this.setState({
      heroPosition,
      currentMap: newMap,
      monsters: monstersArray
    });




  }

  componentWillUnmount() {
    window.removeEventListner("keydown", this.listener);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">

          <h2>Dungeon Crawler</h2>
        </div>
        {/* NOTE: Test map, remove */}
        <Map map={this.testMap} />

      </div>
    );
  }
}

export default App;
