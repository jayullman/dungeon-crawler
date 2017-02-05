import React, { Component } from 'react';
import './styles/App.css';
import Map from './components/Map';

// import listener from './keyboard_listeners';
import * as helpers from './helpers';

import handleHeroMove from './handleHeroMove';
import initializeGame from './initializeGame';
import GameLostScreen from './components/GameLostScreen';
import GameWonScreen from './components/GameWonScreen';

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
  TILE_WEAPON,
  TILE_HEALTH,
  TILE_ARMOR,
  TILE_TORCH,
  STARTING_BOSS_STRENGTH,
  STARTING_BOSS_HEALTH,
  STARTING_BOSS_DEFENSE,
  MINIMUM_PLAYABLE_SPACE,
  STARTING_ARMOR_TILES,
  STARTING_WEAPON_TILES,
  STARTING_HEALTH_TILES,
  STARTING_TORCH_TILES,
  STARTING_MONSTER_TILES,
  STARTING_STATE
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

    this.state = STARTING_STATE;

  }


  componentDidMount() {
    // binds 'this' to the hero move handler
    const boundHandleHeroMove = handleHeroMove.bind(this);
    window.addEventListener("keydown", boundHandleHeroMove);

    // sets up map and places tiles
    initializeGame.call(this);


  }

  componentWillUnmount() {
    window.removeEventListner("keydown", this.listener);
  }

  handlePlayAgainButton = () => {
    helpers.restartGame.call(this);
  }

  render() {
    return (
      <div className="App">
        {this.state.playerDied
          ? <GameLostScreen
              handlePlayAgainButton={this.handlePlayAgainButton}
           />
          : null}
          {this.state.playerWon
            ? <GameWonScreen
                handlePlayAgainButton={this.handlePlayAgainButton}
              />
            : null}
        <div className="App-header">

          <h2>Dungeon Crawler</h2>
        </div>


        <HealthXP
          currentHealth={this.state.hero.health}
          maxHealth={this.state.hero.maxHealth}
          currentXP={this.state.hero.XP}
          nextXP={this.state.hero.nextXPLevel}
          level={this.state.hero.level}
        />
        <Map
          map={this.state.viewPort}
          visibilityMap={this.state.isVisibleArray}
        />
        <EquipmentStats
          currentWeapon={this.state.hero.weapon}
          currentArmor={this.state.hero.armor}
          defense={this.state.hero.defense}
          hasKey={this.state.hero.hasKey}
          strength={this.state.hero.strength}
        />
        {/* test map
        <Map
          map={this.state.map}
          visibilityMap={this.state.revealedMap}
        />
        */}
      </div>
    );
  }
}

export default App;
