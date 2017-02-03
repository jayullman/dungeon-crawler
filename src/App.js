import React, { Component } from 'react';
import './styles/App.css';
import Map from './components/Map';

// import listener from './keyboard_listeners';
import * as helpers from './helpers';

import generateRooms from './generateRooms';

import {
  UP_KEY,
  RIGHT_KEY,
  DOWN_KEY,
  LEFT_KEY,
  TILE_ROOM,
  TILE_HERO,
  TILE_MONSTER,
  TILE_BOSS
} from './constant-values';


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
      map: [],
      heroPosition: {},
      tileUnderHero: TILE_ROOM,
      // monsters property will hold an array of monster objects which
      // will describe their type, health, and map location
      monsters: []
    }
    // TODO: set up initial boss positioning
    //bossPosition: {}

    // NOTE: Test map, remove
    // TEST MAP

  }

handleHeroMove = (event) => {

    // ignore non-valid key inputs
    if (event.keyCode !== UP_KEY
      && event.keyCode !== RIGHT_KEY
      && event.keyCode !== DOWN_KEY
      &&  event.keyCode !== LEFT_KEY) {
          return;
        }
    let currentHeroPosition = this.state.heroPosition;
    let nextPosition;
    let newMapArray = [...this.state.map];
    switch (event.keyCode) {

      case UP_KEY:
        event.preventDefault();

        nextPosition = helpers.getUpPosition(currentHeroPosition);
        break;

      case RIGHT_KEY:
        event.preventDefault();

        nextPosition = helpers.getRightPosition(currentHeroPosition);
        break;

      case DOWN_KEY:
        event.preventDefault();

        nextPosition = helpers.getDownPosition(currentHeroPosition);
        break;

      case LEFT_KEY:
        event.preventDefault();
        nextPosition = helpers.getLeftPosition(currentHeroPosition);
        break;

      default:
        break;

    }

    if (helpers.isMoveValid(nextPosition, this.state.map)) {

      // future tile under hero
      const oldTile = newMapArray[nextPosition.row][nextPosition.col];
      newMapArray[currentHeroPosition.row][currentHeroPosition.col] = this.state.tileUnderHero;
      newMapArray[nextPosition.row][nextPosition.col] = TILE_HERO;
      // newMapArray = helpers.moveHero(this.state.map, currentHeroPosition, nextPosition, this.state.tileUnderHero);
      this.setState({
        map: newMapArray,
        heroPosition: nextPosition,
        tileUnderHero: oldTile
      });


    } else {
      // TODO: add obstacle handling here
    }

  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleHeroMove);


    // TODO: move map building code to map component so I can render a loading screen

    // place monsters and hero characters
    // let newMap = helpers.placeCharacters(this.state.map);
    // this.setState({map: newMap})
    let initialMap = [];
    do {
    initialMap = generateRooms();
  } while (initialMap.length === 0);


    const allValidCharacterPositions = helpers.findAllValidCharacterSpaces(initialMap);
    console.log(allValidCharacterPositions);

    // helper function to select random index from array
    function selectRandomIndex(arr) {
      const index = Math.floor(Math.random() * arr.length);
      return index;
    }
    let randomIndex;
    // select random index from allValidCharacterPositions array
    // splice off the location at that index and store in heroIndex
    randomIndex = selectRandomIndex(allValidCharacterPositions);
    let heroPosition = allValidCharacterPositions.splice(randomIndex, 1)[0];


    // TODO: remove hard coding
    initialMap[heroPosition.row][heroPosition.col] = TILE_HERO;

    //initialMap[50][50] = '9';

    // number of monsters on the board
    const monsterNumber = 5; // TODO: remove hard coding
    // create initial array of monsters
    const monstersArray = helpers.createMonsters(monsterNumber);

    // place all monsters on board
    for (let i = 0; i < monstersArray.length; i++) {
      randomIndex = selectRandomIndex(allValidCharacterPositions);
      let monsterPosition = allValidCharacterPositions.splice(randomIndex, 1)[0];
      initialMap[monsterPosition.row][monsterPosition.col] = TILE_MONSTER;
    }

    // place monster on board
    const allValidBossPositions = helpers.findAllValidBossSpaces(initialMap);
    randomIndex = selectRandomIndex(allValidBossPositions);
    let bossPosition = allValidBossPositions.splice(randomIndex, 1)[0];
    initialMap[bossPosition.row][bossPosition.col] = TILE_BOSS;



    this.setState({
      map: initialMap,
      heroPosition: heroPosition,
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
        {this.state.map.length > 0
          ? <Map map={this.state.map} />
          : <p>loading</p>
        }

      </div>
    );
  }
}

export default App;
