import {
  TILE_HERO,
  TILE_ROOM,
  TILE_DOOR,
  TILE_BOSS_ROOM,
  TILE_KEY,
  TILE_HEALTH,
  TILE_WEAPON,
  TILE_ARMOR,
  TILE_LOCKED_DOOR,
  HEAL_VALUE,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
  MAP_WIDTH,
  MAP_HEIGHT,
  TILE_HIDDEN,
  TILE_TORCH
} from './constant-values';

export function initializeVisibilityMap(revealed) {
  let isVisibleArray = [];
  let row = [];
  for (var i = 0; i < MAP_WIDTH; i++) {
    row = [];
    for (var j = 0; j < MAP_HEIGHT; j++) {
      row.push(revealed);
    }
    isVisibleArray.push(row);
  }

  return isVisibleArray;
}

// removes hidden spaces around player
// torchValue is how much of the space is revealed to the player
export function removeHiddenMap(heroPosition, visibilityMap, torchValue = 12) {
  let visibilityArray = [...visibilityMap];

  // ensure torchValue is even
  if (torchValue % 2 !== 0) {
    torchValue++;
  }

  const ROW_LIMIT = visibilityArray.length - 1;
  const COL_LIMIT = visibilityArray[0].length - 1;

  let row, col;
  let bubbleWidth = 1;


  let colOffset = 0;
  for (let i = 0; i < torchValue; i++) {
    col = heroPosition.col + colOffset;
    row = heroPosition.row - torchValue/2+1 + i;
    for (let j = 0; j < bubbleWidth; j++) {

      // ensure stays within bounds of array
      if (row < 0) {
        row = 0;
      } else if (row > ROW_LIMIT) {
        row = ROW_LIMIT;
      }
      if (col < 0) {
        col = 0;
      } else if (col +j > COL_LIMIT) {
        col = COL_LIMIT;
      }

      visibilityArray[row][col+j] = true;


    }
    if (row < heroPosition.row) {
      bubbleWidth += 2;
      colOffset--;
    } else if (row > heroPosition.row) {
      bubbleWidth -= 2;
      colOffset++;
    }
  }


  return visibilityArray
}

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

export function isMoveValid(position, map, hasKey) {
  let nextPosition = map[position.row][position.col];

  if (nextPosition === TILE_ROOM
    || nextPosition === TILE_BOSS_ROOM
    || nextPosition === TILE_DOOR
    || nextPosition === TILE_KEY
    || nextPosition === TILE_HEALTH
    || nextPosition === TILE_TORCH
    || nextPosition === TILE_WEAPON
    || nextPosition === TILE_ARMOR
    || (nextPosition === TILE_LOCKED_DOOR && hasKey)) {
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

// if monsterIndex = null, it is the boss
export function damageMonster(monsterIndex) {
  let damageValue = Math.floor(Math.random() * this.state.hero.strength) + 1;

  if (monsterIndex !== null) {
    const currentMonsterHealth = this.state.monsters[monsterIndex].health;
    const prevMonsterState = this.state.monsters[monsterIndex];


    const newMonsterState = {...prevMonsterState, health: currentMonsterHealth - damageValue};
    const newMonstersArray = [...this.state.monsters];

    newMonstersArray.splice(monsterIndex, 1, newMonsterState);

    this.setState({
      monsters: newMonstersArray
    });
  // for  boss
  } else {
    damageValue -= this.state.boss.defense;
    const newBossHealth = this.state.boss.health - damageValue;
    const prevBossState = this.state.boss;

    this.setState({
      boss: {...prevBossState, health: newBossHealth}
    });
  }
}

// if monsterIndex = null, it is the boss
export function damageHero(monsterIndex) {
  let damageValue;
  if (monsterIndex !== null) {
    damageValue = Math.floor(Math.random()
      * this.state.monsters[monsterIndex].strength) + 1
      - this.state.hero.defense;

  // for boss
  } else {
    damageValue = Math.floor(Math.random()
      * this.state.boss.strength) + 1
      - this.state.hero.defense;
  }
  if (damageValue < 0) {
    damageValue = 0;
  }

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

  return newMap;
}

export function healHero() {
  const heroMaxHealth = this.state.hero.maxHealth;
  const currentHealth = this.state.hero.health;
  let newHealthValue = currentHealth + HEAL_VALUE;

  if (newHealthValue > heroMaxHealth) {
    newHealthValue = heroMaxHealth;
  }

  this.setState({
    hero: {...this.state.hero, health: newHealthValue}
  })
}

// creates a subsectin of the map
export function createViewPort(heroPosition, fullMap, visibilityMap) {
  const ROW_LIMIT = fullMap.length;
  const COL_LIMIT = fullMap[0].length;
  let viewPort = [];
  let viewPortBeginRow = heroPosition.row - (VIEWPORT_HEIGHT / 2);
  let viewPortBeginCol = heroPosition.col - (VIEWPORT_WIDTH / 2);


  if (viewPortBeginRow < 0) {
    viewPortBeginRow = 0;

  }
  if (viewPortBeginCol < 0) {
    viewPortBeginCol = 0;

  }

  let viewPortEndRow = viewPortBeginRow + VIEWPORT_HEIGHT;
  let viewPortEndCol = viewPortBeginCol + VIEWPORT_WIDTH;

  if (viewPortEndRow > ROW_LIMIT) {
    viewPortEndRow = ROW_LIMIT;
    viewPortBeginRow = ROW_LIMIT - VIEWPORT_WIDTH;

  }
  if (viewPortEndCol > COL_LIMIT) {
    viewPortEndCol = COL_LIMIT;
    viewPortBeginCol = COL_LIMIT - VIEWPORT_HEIGHT;
  }

  let row;
  for (var i = viewPortBeginRow; i < viewPortEndRow; i++) {
    row = [];
    for (var j = viewPortBeginCol; j < viewPortEndCol; j++) {
      if (visibilityMap[i][j] === true) {
        row.push(fullMap[i][j]);
      } else {
        row.push(TILE_HIDDEN);
      }
    }
    viewPort.push(row);
  }
  return viewPort;
}
