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
  TILE_BOSS,
  TILE_KEY,
  TILE_ITEM,
  TILE_HEALTH
} from './constant-values';


class App extends Component {
  constructor() {
    super();

    this.state = {
      map: [],
      viewPort: [],
      heroPosition: {},
      hero: {
        health: 20,
        maxHealth: 20,
        strength: 5,
        XP: 0,
        nextXPLevel: 100
      },
      tileUnderHero: TILE_ROOM,
      // monsters property will hold an array of monster objects which
      // will describe their type, health, and map location
      monsters: []
    }
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

      const viewPort = helpers.createViewPort(nextPosition, newMapArray);
      // newMapArray = helpers.moveHero(this.state.map, currentHeroPosition, nextPosition, this.state.tileUnderHero);
      this.setState({
        map: newMapArray,
        viewPort: viewPort,
        heroPosition: nextPosition,
        tileUnderHero: oldTile
      });


    } else {
      // Obstacle handling here:
      if (this.state.map[nextPosition.row][nextPosition.col] === TILE_MONSTER) {
        let monsterIndex = helpers.selectMonsterFromPosition.call(this, {
          row: nextPosition.row,
          col: nextPosition.col
        });
        helpers.damageHero.call(this, monsterIndex);
        helpers.damageMonster.call(this, monsterIndex);
        console.log('monster health: ', this.state.monsters[monsterIndex].health);
        console.log('hero health: ', this.state.hero.health);
        console.log(this.state.monsters.length);


        // check if monster or hero have died
        if (this.state.hero.health < 1) {
          console.log('hero died! game over');
          // TODO: create game over logic

        } else if (this.state.monsters[monsterIndex].health < 1) {
          // destroy monster, remove from board, array, and give player experience
          helpers.killMonster.call(this, monsterIndex);

        }
      }
      // TODO: add item cases here

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


    initialMap[heroPosition.row][heroPosition.col] = TILE_HERO;


    // number of monsters on the board
    const monsterNumber = 20; // TODO: remove hard coding
    // create initial array of monsters
    const monstersArray = helpers.createMonsters(monsterNumber);

    // place all monsters on board
    // Monsters are kept in an array in state. They are independent from the markers
    // on the map. In order to interact, the correct monster must be crossed referenced
    // based on its map location
    for (let i = 0; i < monstersArray.length; i++) {
      randomIndex = selectRandomIndex(allValidCharacterPositions);
      let monsterPosition = allValidCharacterPositions.splice(randomIndex, 1)[0];
      initialMap[monsterPosition.row][monsterPosition.col] = TILE_MONSTER;
      monstersArray[i].row = monsterPosition.row;
      monstersArray[i].col = monsterPosition.col;
    }

    // place boss on board
    const allValidBossPositions = helpers.findAllValidBossSpaces(initialMap);
    randomIndex = selectRandomIndex(allValidBossPositions);
    let bossPosition = allValidBossPositions.splice(randomIndex, 1)[0];
    initialMap[bossPosition.row][bossPosition.col] = TILE_BOSS;


    // place key on board
    randomIndex = selectRandomIndex(allValidCharacterPositions);
    let keyPosition = allValidCharacterPositions.splice(randomIndex, 1)[0];
    initialMap[keyPosition.row][keyPosition.col] = TILE_KEY;

    // place equipment items on board
    randomIndex = selectRandomIndex(allValidCharacterPositions);
    let itemPosition = allValidCharacterPositions.splice(randomIndex, 1)[0];
    initialMap[itemPosition.row][itemPosition.col] = TILE_ITEM;

    // place health items on board
    let numHealthItems = 15; // TODO: remove hard coding
    for (let i = 0; i < numHealthItems; i++) {
      randomIndex = selectRandomIndex(allValidCharacterPositions);
      let healthPosition = allValidCharacterPositions.splice(randomIndex, 1)[0];
      initialMap[healthPosition.row][healthPosition.col] = TILE_HEALTH;
    }

    // create viewport

      const viewPort = helpers.createViewPort(heroPosition, initialMap);


    this.setState({
      map: initialMap,
      viewPort: viewPort,
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

        {/* <Map map={this.state.map} /> */}
        <Map map={this.state.viewPort} />
        }

      </div>
    );
  }
}

export default App;
