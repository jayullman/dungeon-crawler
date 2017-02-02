// function will take in blank map array and output an array with
// rooms hollowed out connected by hallways

import * as helpers from './helpers';

const NORTH = 'NORTH';
const SOUTH = 'SOUTH';
const EAST = 'EAST';
const WEST = 'WEST';

const DIRECTIONS = [NORTH, SOUTH, EAST, WEST];

const roomWidth = 10;
const roomHeight = 10;

function getRandomLocation(map) {
  const ROW_LIMIT = map.length;
  const COL_LIMIT = map[0].length;
  let randomRow, randomCol, position;

  do {
  randomRow = Math.floor(Math.random() * ROW_LIMIT);
  randomCol = Math.floor(Math.random() * COL_LIMIT);
  position = {row: randomRow, col: randomCol}

} while (map[position.row][position.col] !== 1);

    return position;
}

export default function generateRooms(map) {
  let tempMap;
  let newMap = [];
  let row = [];
  // TEMP create blank array
  for (var i = 0; i < 100; i++) {
    row = [];
    for (var j = 0; j < 100; j++) {
      row.push(1);
    }
    newMap.push(row);
  }

  do {
    let bossRoomStartPosition = getRandomLocation(newMap);
    console.log(bossRoomStartPosition);

    tempMap = hollowRoom(bossRoomStartPosition, newMap);
  }
  // keep repeating until hollowRoom returns a map value
  while (!tempMap);

  newMap = tempMap;
  //
  // if (newMap[bossRoomStartPosition.row][bossRoomStartPosition.col] === 1) {
  //
  //   // return original newMap if hollowRoom returns false
  //   newMap = hollowRoom(bossRoomStartPosition, newMap) || newMap;
  //
  //
  // } else {
  //
  // }
  //

  // make all other non-boss rooms

  // pop a random direction off of the directions array
  let num = Math.floor(Math.random() * 4);
  console.log(num);
  let directions = [...DIRECTIONS];
  let randomDirection = directions.splice(num, 1)[0];
  console.log('random direction: ', randomDirection);

  makeRooms

  return newMap;
}

// return false if room cannot be hollowed out
// return newMap otherwise
function hollowRoom(roomPosition, map) {
  const ROW_LIMIT = map.length;
  const COL_LIMIT = map[0].length;

  const beginRow = roomPosition.row;
  const beginCol = roomPosition.col;
  const endRow = beginRow + roomHeight;
  const endCol = beginCol + roomWidth;

  // ensure that room is within bounds of map array and one
  // away from the wall
  if (endRow > ROW_LIMIT - 1 || endCol > COL_LIMIT - 1) {
    return false;
  }
  if (beginRow < 1 || beginCol < 1) {
    return false;
  }

  let editedMap = [...map];
  for (let i = beginRow; i < endRow; i++) {
    for (let j = beginCol; j < endCol; j++) {
      if (editedMap[i][j] === 1) {
        editedMap[i][j] = 0;
      } else {
        return false;
      }
    }
  }
  return editedMap;
}

// function recursively builds rooms
// will select at random 1-4 possible doors on each side
// will keep building out until it cannot build anymore, then recurse back
// if originDirection is null, it is the first room, ie the boss room
function makeRooms(originDirection, doorPosition) {
  // TODO: figure out how to build off of boss room
  if (originDirection === null) {

  }

}


/* Algorithm

  Place Boss Room:
    pick random location with getRandomMapLocation(newMap)

    if tile === 1:
      see if a 10x10 room fits
    else:
      pick another location









*/
