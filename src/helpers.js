import {
  TILE_HERO,
  TILE_ROOM,
  TILE_DOOR,
  TILE_BOSS_ROOM
} from './constant-values';

// NOTE: do I need this function anymore?
export function moveHero(mapArray, currentPosition, newPosition, tileUnderHero) {
  let newMapArray = [...mapArray];

  // replace tile that hero was currently occupying
  newMapArray[currentPosition.row][currentPosition.col] = tileUnderHero;

  // place hero at new location
  newMapArray[newPosition.row][newPosition.col] = TILE_HERO;

  return newMapArray;
}

export function getUpPosition(currentPosition) {
  const newPosition = {
    row: currentPosition.row - 1,
    col: currentPosition.col
  }

  return newPosition;
}

export function getRightPosition(currentPosition) {
  const newPosition = {
    row: currentPosition.row,
    col: currentPosition.col + 1
  }

  return newPosition;
}

export function getDownPosition(currentPosition) {
  const newPosition = {
    row: currentPosition.row + 1,
    col: currentPosition.col
  }

  return newPosition;
}

export function getLeftPosition(currentPosition) {
  const newPosition = {
    row: currentPosition.row,
    col: currentPosition.col - 1
  }

  return newPosition;
}

export function isMoveValid(position, map) {
  let nextPosition = map[position.row][position.col];

  if (nextPosition === TILE_ROOM
    || nextPosition === TILE_DOOR) {
    return true;
  } else {
    return false;
  }
}

// this function will place hero and monster characters in initial position
export function placeHero(possiblePositionsArray, map) {
  let randomLocation = {};
  let newMap = [...map];
  randomLocation = getRandomMapLocation(map);
  newMap[randomLocation.row][randomLocation.col] = 2;
  return randomLocation;
}

export function createMonsters(monsterNumber, map) {
  let monstersArray = [];

  for (let i = 0; i < monsterNumber; i++) {
    monstersArray.push(new Monster());
  }

  return monstersArray;
}

export function placeMonsters(monstersArray, map) {
  let newMap = [...map];

  for (let i = 0; i < monstersArray.length; i++) {
    newMap[monstersArray[i].position.row][monstersArray[i].position.col] = 3;
  }

  return newMap;
}

// monster constructor
function Monster() {
  // TODO: make health variable, possibly based on board
  this.health = 10;
  this.strength = 5;
  this.level = 1;
}

export function getRandomMapLocation(map) {
  console.log(map[0].length);
  const ROW_LIMIT = map.length;
  const COL_LIMIT = map[0].length;
  let randomRow, randomCol, position;

  do {
  randomRow = Math.floor(Math.random() * ROW_LIMIT);
  randomCol = Math.floor(Math.random() * COL_LIMIT);
  position = {row: randomRow, col: randomCol}

} while (!(isMoveValid(position, map)));

  return position;
}

// function will collect all possible spaces that the hero
// and monsters, except boss, can be placed. returned as array of location objects
export function findAllValidCharacterSpaces(map) {
  let validLocations = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === TILE_ROOM) {
        validLocations.push({row: i, col: j});
      }
    }
  }


  return validLocations;
}

export function findAllValidBossSpaces(map) {
  let validLocations = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === TILE_BOSS_ROOM) {
        validLocations.push({row: i, col: j});
      }
    }
  }

  return validLocations;
}

export function damageMonster(monsterIndex) {
  const damageValue = Math.floor(Math.random() * this.state.hero.strength) + 1;
  const currentMonsterHealth = this.state.monsters[monsterIndex].health;
  const prevMonsterState = this.state.monsters[monsterIndex];


  const newMonsterState = {...prevMonsterState, health: currentMonsterHealth - damageValue};
  const newMonstersArray = [...this.state.monsters];

  newMonstersArray.splice(monsterIndex, 1, newMonsterState);

  this.setState({
    monsters: newMonstersArray
  });
}

export function damageHero(monsterIndex) {
  const damageValue = Math.floor(Math.random()
    * this.state.monsters[monsterIndex].strength) + 1;

  this.setState({
    hero: {...this.state.hero, health: this.state.hero.health - damageValue}
  })
}

export function selectMonsterFromPosition(position) {
  const row = position.row;
  const col = position.col;

  const index = this.state.monsters.findIndex((monster) => {
    return row === monster.row && col === monster.col;
  });

  return index;
}

// destroy monster, remove from board, array, and give player experience
export function killMonster(monsterIndex) {
  let newMonstersArray = [...this.state.monsters];
  let newMap = [...this.state.map];

  newMap[newMonstersArray[monsterIndex].row][newMonstersArray[monsterIndex].col]
    = TILE_ROOM;

  newMonstersArray.splice(monsterIndex, 1);


  this.setState({
    map: newMap,
    monsters: newMonstersArray
  });

}
