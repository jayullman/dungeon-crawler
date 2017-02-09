// function will take in blank map array and output an array with
// rooms hollowed out connected by hallways

import {
  NORTH,
  SOUTH,
  EAST,
  WEST,
  TILE_BOSS_ROOM,
  TILE_ROOM,
  TILE_WALL,
  TILE_DOOR,
  TILE_LOCKED_DOOR,
  DIRECTIONS,
  MAP_WIDTH,
  MAP_HEIGHT
} from './constant-values';

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

  // create map
  for (var i = 0; i < MAP_WIDTH; i++) {
    row = [];
    for (var j = 0; j < MAP_HEIGHT; j++) {
      row.push(1);
    }
    newMap.push(row);
  }

  // find location of the first room which will be the boss room
  do {
    var bossRoomStartPosition = getRandomLocation(newMap);

    tempMap = hollowRoom(bossRoomStartPosition, TILE_BOSS_ROOM, newMap);
  }
  // keep repeating until hollowRoom returns a map value
  while (!tempMap);

  newMap = tempMap;

  newMap = makeRooms(null, bossRoomStartPosition, newMap);

  return newMap;
}

// create one new room built off of the room at roomPosition
// return false if room cannot be hollowed out
// return newMap otherwise
function hollowRoom(roomPosition, tileType, map) {
  roomPosition.height = roomPosition.height || 10;
  roomPosition.width = roomPosition.width || 10;

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
      if (map[i][j] !== TILE_WALL
        || map[i-1][j] !== TILE_WALL
        || map[i+1][j] !== TILE_WALL
        || map[i][j-1] !== TILE_WALL
        || map[i][j+1] !== TILE_WALL) {
          return false;
        }

    }
  }

  // if there is room, carve out the new room
  let editedMap = [...map];
  for (let i = beginRow; i < endRow; i++) {
    for (let j = beginCol; j < endCol; j++) {
        editedMap[i][j] = tileType;

    }
  }

  return editedMap;
}

// function recursively builds rooms
// will select at random 1-4 possible doors on each side
// will keep building out until it cannot build anymore, then recurse back
// if originDirection is null, it is the first room, ie the boss room
// roomPosition is the location of the top left corner of the room
function makeRooms(originDirection, originRoom, map) {
  // select one door direction at random for the boss room
  let directions = [];
  let newMap = [];
  let tempMap = [];
  let tileType = TILE_ROOM;

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

    // new rooms will be created 11 spaces away depending on direction.
    // 1 space will be reserved for the connecting hallway
    const newRoomHeight = Math.floor(Math.random() * 10) + 10;
    const newRoomWidth = Math.floor(Math.random() * 10) + 10;
    if (randomDirection === NORTH) {
      newRoom = {
        row: originRoom.row - newRoomHeight - 1,
        col: originRoom.col,
        height: newRoomHeight,
        width: newRoomWidth
      }
    } else if (randomDirection === EAST) {
      newRoom = {
        row: originRoom.row,
        col: originRoom.col + originRoom.width + 1,
        height: newRoomHeight,
        width: newRoomWidth
      }
    } else if (randomDirection === SOUTH) {
      newRoom = {
        row: originRoom.row + originRoom.height + 1,
        col: originRoom.col,
        height: newRoomHeight,
        width: newRoomWidth
      }
    } else if (randomDirection === WEST) {
      newRoom = {
        row: originRoom.row,
        col: originRoom.col - newRoomWidth - 1,
        height: newRoomHeight,
        width: newRoomWidth,
      }
    //
  }

    // repeat if hollowRoom returns false
  tempMap = hollowRoom(newRoom, tileType, map);
  // if room creation is successful
  if (tempMap) {
    tempMap = attachDoor(randomDirection, originRoom, newRoom, tempMap);

    newMap = tempMap;

    makeRooms(randomDirection, newRoom, newMap);
  }

  roomCount++;

}

  return newMap;
}

// function takes two rooms and attaches them with a door
function attachDoor(direction, originRoom, newRoom, map) {
  let newMap = [...map];
  let isDoorLocked = newMap[originRoom.row][originRoom.col] === TILE_BOSS_ROOM
    ? true
    : false;

  // all position on map where a door between the two rooms can exist
  let commonBorders = [];
  if (direction === NORTH) {
    for (let i = 0; i < originRoom.width; i++) {
      if (newMap[originRoom.row - 2][originRoom.col + i] === TILE_ROOM) {
        commonBorders.push({row: originRoom.row - 1, col: originRoom.col + i});
      }
    }
  } else if (direction === EAST) {
    for (let i = 0; i < originRoom.height; i++) {
      if (newMap[originRoom.row + i][originRoom.col + originRoom.width + 1] === TILE_ROOM) {
        commonBorders.push({row: originRoom.row + i, col: originRoom.col + originRoom.width});
      }
    }

  } else if (direction === SOUTH) {
    for (let i = 0; i < originRoom.width; i++) {
      if (newMap[originRoom.row + originRoom.height + 1][originRoom.col + i] === TILE_ROOM) {
        commonBorders.push({row: originRoom.row + originRoom.height, col: originRoom.col + i});
      }
    }

  } else if (direction === WEST) {
      for (let i = 0; i < originRoom.height; i++) {
        if (newMap[originRoom.row + i][originRoom.col - 2] === TILE_ROOM) {
          commonBorders.push({row: originRoom.row + i, col: originRoom.col - 1});
        }
      }
    }



  // select random location along common border to place door
  const randomLocation = commonBorders[Math.floor(Math.random() * commonBorders.length)];
  if (direction === EAST) {
  }
  if (isDoorLocked) {
    newMap[randomLocation.row][randomLocation.col] = TILE_LOCKED_DOOR;
  } else {
    newMap[randomLocation.row][randomLocation.col] = TILE_DOOR;
  }


return map;

}
