// sets up map and places items

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
  STARTING_MONSTER_TILES
} from './constant-values';



export default function initializeGame() {
  let initialMap = [];
  do {
  initialMap = generateRooms();

  if (initialMap) {
    var allValidCharacterPositions = helpers.findAllValidCharacterSpaces(initialMap);
  }
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
  // create initial array of monsters
  const monstersArray = helpers.createMonsters(STARTING_MONSTER_TILES);

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

  // place weapon items on board
  for (let i = 0; i < STARTING_WEAPON_TILES; i++) {
    randomIndex = selectRandomIndex(allValidCharacterPositions);
    let weaponPosition = allValidCharacterPositions.splice(randomIndex, 1)[0];
    initialMap[weaponPosition.row][weaponPosition.col] = TILE_WEAPON;
  }

  // place armor items on board
  for (let i = 0; i < STARTING_ARMOR_TILES; i++) {
    randomIndex = selectRandomIndex(allValidCharacterPositions);
    let armorPosition = allValidCharacterPositions.splice(randomIndex, 1)[0];
    initialMap[armorPosition.row][armorPosition.col] = TILE_ARMOR;
  }

  // place torches on board
  for (let i = 0; i < STARTING_TORCH_TILES; i++) {
    randomIndex = selectRandomIndex(allValidCharacterPositions);
    let torchPosition = allValidCharacterPositions.splice(randomIndex, 1)[0];
    initialMap[torchPosition.row][torchPosition.col] = TILE_TORCH;
  }

  // place health items on board
  for (let i = 0; i < STARTING_HEALTH_TILES; i++) {
    randomIndex = selectRandomIndex(allValidCharacterPositions);
    let healthPosition = allValidCharacterPositions.splice(randomIndex, 1)[0];
    initialMap[healthPosition.row][healthPosition.col] = TILE_HEALTH;
  }


  // initialize visibility map
  let visibilityArray = helpers.initializeVisibilityMap(false);
  visibilityArray = helpers.removeHiddenMap(heroPosition, visibilityArray);

  // create open map for testing
  let revealedMap = helpers.initializeVisibilityMap(true);

  // create viewport
  const viewPort = helpers.createViewPort(heroPosition, initialMap, visibilityArray);


  this.setState({
    map: initialMap,
    viewPort: viewPort,
    visibilityArray: visibilityArray,
    revealedMap: revealedMap,
    heroPosition: heroPosition,
    monsters: monstersArray
  });

}
