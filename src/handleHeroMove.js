// function handles when the hero moves and interacts with items
// and monsters on the board
import * as helpers from './helpers';

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

export default function handleHeroMove(event) {
  // removes the tile at the given position and replaces with
  // tile value given
  function removeTileFromBoard(position, tileValue) {
    let newMapArray = [...this.state.map];
    newMapArray[position.row][position.col] = tileValue;
    this.setState({map: newMapArray});
  }

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
    const tileValue = this.state.map[nextPosition.row][nextPosition.col];
    if (helpers.isMoveValid(nextPosition, this.state.map)) {

      // handle items that player can move through
      if (tileValue === TILE_HEALTH) {
        helpers.healHero.call(this);
        removeTileFromBoard.call(this, nextPosition, TILE_ROOM);
      } else if (tileValue === TILE_TORCH) {
        // add to the the hero's torchValue
        console.log('yo!');
        removeTileFromBoard.call(this, nextPosition, TILE_ROOM);
        this.setState({
          hero: {...this.state.hero, torchValue: this.state.hero.torchValue + 2}
        });
      }
      // future tile under hero
      const oldTile = newMapArray[nextPosition.row][nextPosition.col];
      newMapArray[currentHeroPosition.row][currentHeroPosition.col] = this.state.tileUnderHero;
      newMapArray[nextPosition.row][nextPosition.col] = TILE_HERO;



      let visibilityArray = helpers.removeHiddenMap(nextPosition,
          [...this.state.visibilityArray], this.state.hero.torchValue);

      const viewPort = helpers.createViewPort(nextPosition, newMapArray, visibilityArray);
      // newMapArray = helpers.moveHero(this.state.map, currentHeroPosition, nextPosition, this.state.tileUnderHero);
      this.setState({
        map: newMapArray,
        viewPort: viewPort,
        visibilityArray: visibilityArray,
        heroPosition: nextPosition,
        tileUnderHero: oldTile
      });


    } else {
      //  handle tiles that player cannot move through
      if (tileValue === TILE_MONSTER) {
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
          // NOTE: mosters are not disappearing until after hero moves
          // has to do with viewport not updating
        }
      }
      // TODO: add item cases here

    }

  }
