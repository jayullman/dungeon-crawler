// function handles when the hero moves and interacts with items
// and monsters on the board
import * as helpers from './helpers';

import {
  UP_KEY,
  RIGHT_KEY,
  DOWN_KEY,
  LEFT_KEY,
  RETURN_KEY,
  TILE_ROOM,
  TILE_HERO,
  TILE_MONSTER,
  TILE_BOSS,
  TILE_KEY,
  TILE_WEAPON,
  TILE_LOCKED_DOOR,
  TILE_ARMOR,
  TILE_HEALTH,
  TILE_TORCH,
  WEAPON_NAMES,
  ARMOR_NAMES,
  STARTING_ARMOR,
  STARTING_WEAPON,
  MAX_WEAPON_ATTACK_BONUS,
  MAX_ARMOR_DEFENSE_BONUS
} from './constant-values';

export default function handleHeroMove(event) {
  // removes the tile at the given position and replaces with
  // tile value given

  // lockout input if player won or lost
  // pressing enter will allow the player to play again
  if (this.state.playerDied || this.state.playerWon || this.state.showInstructions) {
    if (event.keyCode === RETURN_KEY) {
      if (this.state.showInstructions) {
        this.setState({ showInstructions: false });
      }
      helpers.restartGame.call(this);
    }
    return;
  }

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
        this.setState({lastMoveDirectionAttempt: UP_KEY});
        break;

      case RIGHT_KEY:
        event.preventDefault();

        nextPosition = helpers.getRightPosition(currentHeroPosition);
        this.setState({lastMoveDirectionAttempt: RIGHT_KEY});

        break;

      case DOWN_KEY:
        event.preventDefault();

        nextPosition = helpers.getDownPosition(currentHeroPosition);
        this.setState({lastMoveDirectionAttempt: DOWN_KEY});

        break;

      case LEFT_KEY:
        event.preventDefault();

        nextPosition = helpers.getLeftPosition(currentHeroPosition);
        this.setState({lastMoveDirectionAttempt: LEFT_KEY});

        break;

      default:
        break;

    }
    const tileValue = this.state.map[nextPosition.row][nextPosition.col];
    if (helpers.isMoveValid(nextPosition, this.state.map, this.state.hero.hasKey)) {
      // TODO: make random weapon and armor name generator
      // handle items that player can move through


      // remove damage indicator if hero is no longer fighting
      if (this.state.showDamage) {
        this.setState({showDamage: false});
      }

      if (tileValue === TILE_HEALTH) {
        helpers.healHero.call(this);
        removeTileFromBoard.call(this, nextPosition, TILE_ROOM);
      } else if (tileValue === TILE_TORCH) {
        // add to the the hero's torchValue
        removeTileFromBoard.call(this, nextPosition, TILE_ROOM);
        this.setState({
          hero: {...this.state.hero, torchValue: this.state.hero.torchValue + 2}
        });
      } else if (tileValue === TILE_KEY) {
        removeTileFromBoard.call(this, nextPosition, TILE_ROOM);
        this.setState({
          hero: {...this.state.hero, hasKey: true}
        });
      } else if (tileValue === TILE_WEAPON) {
        removeTileFromBoard.call(this, nextPosition, TILE_ROOM);
        let weaponName = helpers.generateRandomItemName(WEAPON_NAMES);
        // get a random strength bonus 1-3
        let randomBonus = Math.floor(Math.random() * MAX_WEAPON_ATTACK_BONUS) + 1
        // adds random bonus to the weapon name
        weaponName += ` (+${randomBonus})`;
        let newWeaponsArray = [...this.state.hero.weapons, weaponName];

        // removes starting weapon from array
        if (newWeaponsArray[0] === STARTING_WEAPON) {
          newWeaponsArray.splice(0, 1);
        }
        this.setState({
          hero: {...this.state.hero, strength: this.state.hero.strength + randomBonus,
            weapons: newWeaponsArray}
        });

        console.log(this.state.hero.weapon);
      } else if (tileValue === TILE_ARMOR) {
        removeTileFromBoard.call(this, nextPosition, TILE_ROOM);
        let armorName = helpers.generateRandomItemName(ARMOR_NAMES);
        // get a random defense bonus 1-3
        let randomBonus = Math.floor(Math.random() * MAX_ARMOR_DEFENSE_BONUS) + 1
        // adds random bonus to the armor name
        armorName += ` (+${randomBonus})`;
        let newArmorArray = [...this.state.hero.armor, armorName];

        // removes starting armor from array
        if (newArmorArray[0] === STARTING_ARMOR) {
          newArmorArray.splice(0, 1);
        }
        this.setState({
          hero: {...this.state.hero, defense: this.state.hero.defense + randomBonus,
            armor: newArmorArray},
        });
      } else if (tileValue === TILE_LOCKED_DOOR) {
        if (this.state.hero.hasKey) {
          removeTileFromBoard.call(this, nextPosition, TILE_ROOM);
        }

      }
      console.log(this.state);
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

        // check if monster or hero have died
        if (this.state.hero.health < 1) {
          console.log('hero died! game over');
          // TODO: create game over logic
          this.setState({playerDied: true});


        } else if (this.state.monsters[monsterIndex].health < 1) {
          // destroy monster, remove from board, array, and give player experience
          helpers.killMonster.call(this, monsterIndex);
          // update viewport after monster dies, used to avoid having to move
          // before viewport is updated

          // remove damage indicator if monster dies
          if (this.state.showDamage) {
            this.setState({showDamage: false});
          }


          // check XP level of player and level up if needed
          if (this.state.hero.XP >= this.state.hero.nextXPLevel) {
            console.log('level');
            helpers.levelUpHero.call(this);
          }

          let newViewPort = helpers.createViewPort(this.state.heroPosition, newMapArray, this.state.visibilityArray);
          this.setState({viewPort: newViewPort})

        }
      } if (tileValue === TILE_BOSS) {
        helpers.damageHero.call(this, null);
        helpers.damageMonster.call(this, null);

        // check if monster or hero have died
        if (this.state.hero.health < 1) {
          console.log('hero died! game over');
          // TODO: create game over logic
          this.setState({playerDied: true});
      } else if (this.state.boss.health < 1) {
        // win game
        // before viewport is updated
        let newViewPort = helpers.createViewPort(this.state.heroPosition, newMapArray, this.state.visibilityArray);
        this.setState({viewPort: newViewPort});
        console.log('You won!');
        // TODO: test win condition
        this.setState({playerWon: true});
      }

    }

  }
}
