// function will take in blank map array and output an array with
// rooms hollowed out connected by hallways

import * as helpers from './helpers';

var roomNumber = 2;

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
    var bossRoomStartPosition = getRandomLocation(newMap);

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
  // let num = Math.floor(Math.random() * 4);
  // console.log(num);
  // let directions = [...DIRECTIONS];
  // let randomDirection = directions.splice(num, 1)[0];

 newMap = makeRooms(null, bossRoomStartPosition, newMap);

  return newMap;
}

// create one new room built off of the room at roomPosition
// return false if room cannot be hollowed out
// return newMap otherwise
function hollowRoom(roomPosition, map) {
  roomPosition.height = roomPosition.height || 10;
  roomPosition.width = roomPosition.width || 10;

  console.log(roomPosition);
  const ROW_LIMIT = map.length;
  const COL_LIMIT = map[0].length;

  // check to see if the starting position will be within bounds of the array
  if (roomPosition.row < 1 || roomPosition.col < 1
    || roomPosition.row > ROW_LIMIT - 1 || roomPosition.col > COL_LIMIT - 1 ) {
      return false;
    }


  const beginRow = roomPosition.row;
  const beginCol = roomPosition.col;
  const endRow = beginRow + roomPosition.height;
  const endCol = beginCol + roomPosition.width;

  // ensure that room is within bounds of map array and one
  // away from the wall
  if (endRow > ROW_LIMIT - 1 || endCol > COL_LIMIT - 1) {
    return false;
  }
  if (beginRow < 1 || beginCol < 1) {
    return false;
  }

  // check for space for new room and adjacent spaces
  for (let i = beginRow; i < endRow; i++) {
    for (let j = beginCol; j < endCol; j++) {
      if (map[i][j] !== 1
        || map[i-1][j] !== 1
        || map[i+1][j] !== 1
        || map[i][j-1] !== 1
        || map[i][j+1] !== 1) {
          return false;
        }

    }
  }

  // if there is room, carve out the new room
  let editedMap = [...map];
  for (let i = beginRow; i < endRow; i++) {
    for (let j = beginCol; j < endCol; j++) {
        editedMap[i][j] = roomNumber;

    }
  }
  // NOTE: for testing: remove roomNumber

  return editedMap;
}

// function recursively builds rooms
// will select at random 1-4 possible doors on each side
// will keep building out until it cannot build anymore, then recurse back
// if originDirection is null, it is the first room, ie the boss room
// roomPosition is the location of the top left corner of the room
function makeRooms(originDirection, roomPosition, map) {
  // TODO: figure out how to build off of boss room
  // select one door direction at random for the boss room,
  let directions = [];
  let newMap = [];
  let tempMap = [];

  var numberOfRoomBranches = 1;
  let roomCount = 0;
  if (originDirection !== null) {
      // select a random number 2-3 of room branches off each room not including orgin direction
      numberOfRoomBranches = 3;
      if (originDirection === NORTH) {
        directions = [EAST, SOUTH, WEST];
      } else if (originDirection === EAST) {
        directions = [WEST, SOUTH, NORTH];
      } else if (originDirection === SOUTH) {
        directions = [WEST, EAST, NORTH];
      } else if (originDirection === WEST) {
        directions = [EAST, SOUTH, NORTH];
      }

  } else {
    directions = [...DIRECTIONS];
  }

  // repeat for the number of room branches off each room
  while (roomCount < numberOfRoomBranches) {


    if (directions.length === 0) {
      return;
    }
    let randomNum = Math.floor(Math.random() * directions.length);
    var randomDirection = directions.splice(randomNum, 1)[0];


    // will hold the position object for the new room
    var newRoom = {};

    // TODO: write function that creates an array of possible door locations
    // given the old room object, the new room object, and build direction

    // new rooms will be created 11 spaces away depending on direction.
    // 1 space will be reserved for the connecting hallway
    const newRoomHeight = Math.floor(Math.random() * 10) + 10;
    const newRoomWidth = Math.floor(Math.random() * 10) + 10;
    if (randomDirection === NORTH) {
      newRoom = {
        row: roomPosition.row - newRoomHeight - 1,
        col: roomPosition.col,
        height: newRoomHeight,
        width: newRoomWidth
      }
    } else if (randomDirection === EAST) {
      newRoom = {
        row: roomPosition.row,
        col: roomPosition.col + roomPosition.width + 1,
        height: newRoomHeight,
        width: newRoomWidth
      }
    } else if (randomDirection === SOUTH) {
      newRoom = {
        row: roomPosition.row + roomPosition.height + 1,
        col: roomPosition.col,
        height: newRoomHeight,
        width: newRoomWidth
      }
    } else if (randomDirection === WEST) {
      newRoom = {
        row: roomPosition.row,
        col: roomPosition.col - newRoomWidth - 1,
        height: newRoomHeight,
        width: newRoomWidth,
      }
    //
  }

    // repeat if hollowRoom returns false
  tempMap = hollowRoom(newRoom, map);
  if (tempMap) {
    roomNumber++;

    newMap = tempMap;
    makeRooms(randomDirection, newRoom, newMap);
  }

  roomCount++;

}

  return newMap;
}


/* Algorithm

  Place Boss Room:
    pick random location with getRandomMapLocation(newMap)

    if tile === 1:
      see if a 10x10 room fits
    else:
      pick another location









*/
