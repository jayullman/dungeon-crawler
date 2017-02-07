// BUG: BOSS sometimes gains health after getting damaged

import React, { Component } from 'react';
import './styles/App.css';
import ViewPort from './components/ViewPort';

// import listener from './keyboard_listeners';
import * as helpers from './helpers';

import handleHeroMove from './handleHeroMove';
import initializeGame from './initializeGame';
import GameLostScreen from './components/GameLostScreen';
import GameWonScreen from './components/GameWonScreen';
import Instructions from './components/Instructions';

import Header from './components/Header';
import Footer from './components/Footer';
import EquipmentStats from './components/EquipmentStats';

import {
  STARTING_STATE
} from './constant-values';

// TODO: Add button to regenerate map
//       restartGame()
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

    // sets starting state, shows instructions when app is first loaded,
    this.state = {...STARTING_STATE, showInstructions: true};

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

  // closes instruction screen
  handleOKButton = () => {
    this.setState({ showInstructions: false })
  }

  // handle regenerate map button located in Header
  handleRegenerateMapButton = () => {
    helpers.restartGame.call(this);
  }

  render() {
    return (
      <div className="App">
        {this.state.playerDied
          ?
          <GameLostScreen
              handlePlayAgainButton={this.handlePlayAgainButton}
           />
          : null}
          {this.state.playerWon
            ? <GameWonScreen
                handlePlayAgainButton={this.handlePlayAgainButton}
              />
            : null}
          {this.state.showInstructions
            ? <Instructions
                handleOKButton={this.handleOKButton}
             />
            : null}

        <Header
          handleRegenerateMapButton={this.handleRegenerateMapButton}
         />

         <EquipmentStats
           currentHealth={this.state.hero.health}
           maxHealth={this.state.hero.maxHealth}
           currentXP={this.state.hero.XP}
           nextXP={this.state.hero.nextXPLevel}
           level={this.state.hero.level}
           weapons={this.state.hero.weapons}
           armor={this.state.hero.armor}
           defense={this.state.hero.defense}
           hasKey={this.state.hero.hasKey}
           strength={this.state.hero.strength}
         />

        <ViewPort
          map={this.state.viewPort}
          visibilityMap={this.state.isVisibleArray}
          showDamage={this.state.showDamage}
          damageFromMonster={this.state.lastDamageByMonster}
          monsterCurrentHealth={this.state.lastAttackedMonsterCurrentHealth}
          monsterMaxHealth={this.state.lastAttackedMonsterMaxHealth}
          lastMoveDirection={this.state.lastMoveDirectionAttempt}
        />

        {/* test map
        <Map
          map={this.state.map}
          visibilityMap={this.state.revealedMap}
        />
        */}
        <Footer />
      </div>
    );
  }
}

export default App;
