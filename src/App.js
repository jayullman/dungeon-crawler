import React, { Component } from 'react';
import './styles/App.css';
import Map from './components/Map';

// import listener from './keyboard_listeners';
import * as helpers from './helpers';

import generateRooms from './generateRooms';
import handleHeroMove from './handleHeroMove';

import EquipmentStats from './components/EquipmentStats';
import HealthXP from './components/HealthXP';

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
  TILE_HEALTH,
  TILE_TORCH,
  MINIMUM_PLAYABLE_SPACE
} from './constant-values';


class App extends Component {
  constructor() {
    super();

    /* State Properties
     * map: complete map information
     * viewPort: what the player sees, a scrolling subset of map
     * isVisibleArray: holds false and true values mapping to whether
     *   the player has discovered the location yet
     * hero: player properties
     * tileUnderHero: temp value making it easier to swap tiles when the
     *   hero moves to the next tile
     * monsters: array holding all of the level's monsters
     * torchValue: area revealed around player, must be even
    */

    this.state = {
      map: [],
      viewPort: [],
      visibilityArray: [],
      heroPosition: {},
      hero: {
        health: 20,
        maxHealth: 20,
        strength: 5,
        defense: 0,
        hasKey: false,
        XP: 0,
        nextXPLevel: 100,
        level: 1,
        torchValue: 12,
        weapon: 'Fists',
        armor: 'Dirty Rags'
      },
      tileUnderHero: TILE_ROOM,
      // monsters property will hold an array of monster objects which
      // will describe their type, health, and map location
      monsters: []
    }
  }


  componentDidMount() {
    // binds 'this' to the hero move handler
    const boundHandleHeroMove = handleHeroMove.bind(this);
    window.addEventListener("keydown", boundHandleHeroMove);


    // TODO: move map building code to map component so I can render a loading screen

    // place monsters and hero characters
    // let newMap = helpers.placeCharacters(this.state.map);
    // this.setState({map: newMap})
    let initialMap = [];
    do {
    initialMap = generateRooms();

    if (initialMap) {
      var allValidCharacterPositions = helpers.findAllValidCharacterSpaces(initialMap);
      console.log('length', allValidCharacterPositions.length );
    }
    console.log('ppp');
    // keep generating random dungeon until there is a playable map of considerable size
  } while (initialMap.length === 0 || allValidCharacterPositions.length < MINIMUM_PLAYABLE_SPACE);


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

    // place torches on board
    let numTorchItems = 10; // TODO: remove hard coding
    for (let i = 0; i < numTorchItems; i++) {
      randomIndex = selectRandomIndex(allValidCharacterPositions);
      let torchPosition = allValidCharacterPositions.splice(randomIndex, 1)[0];
      initialMap[torchPosition.row][torchPosition.col] = TILE_TORCH;
    }

    // place health items on board
    let numHealthItems = 15; // TODO: remove hard coding
    for (let i = 0; i < numHealthItems; i++) {
      randomIndex = selectRandomIndex(allValidCharacterPositions);
      let healthPosition = allValidCharacterPositions.splice(randomIndex, 1)[0];
      initialMap[healthPosition.row][healthPosition.col] = TILE_HEALTH;
    }


    // initialize visibility map
    let visibilityArray = helpers.initializeVisibilityMap();
    visibilityArray = helpers.removeHiddenMap(heroPosition, visibilityArray);


    // create viewport
    const viewPort = helpers.createViewPort(heroPosition, initialMap, visibilityArray);


    this.setState({
      map: initialMap,
      viewPort: viewPort,
      visibilityArray: visibilityArray,
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
        <Map
          map={this.state.viewPort}
          visibilityMap={this.state.isVisibleArray}
        />

        <HealthXP
          currentHealth={this.state.hero.health}
          maxHealth={this.state.hero.maxHealth}
          currentXP={this.state.hero.XP}
          nextXP={this.state.hero.nextXPLevel}
          level={this.state.hero.level}
        />
        <EquipmentStats
          currentWeapon={this.state.hero.weapon}
          currentArmor={this.state.hero.armor}
          defense={this.state.hero.defense}
          hasKey={this.state.hero.hasKey}
          strength={this.state.hero.strength}
        />

      </div>
    );
  }
}

export default App;
