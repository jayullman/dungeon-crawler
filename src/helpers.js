

export function moveHero(mapArray, currentPosition, newPosition, tileUnderHero) {
  let newMapArray = [...mapArray];

  // replace tile that hero was currently occupying
  newMapArray[currentPosition.row][currentPosition.col] = tileUnderHero;

  // place hero at new location
  newMapArray[newPosition.row][newPosition.col] = 2;

  return newMapArray;
}

export function getUpPosition(currentPosition, map) {
  const newPosition = {
    row: currentPosition.row - 1,
    col: currentPosition.col
  }

  return newPosition;
}

export function getRightPosition(currentPosition, map) {
  const newPosition = {
    row: currentPosition.row,
    col: currentPosition.col + 1
  }

  return newPosition;
}

export function getDownPosition(currentPosition, map) {
  const newPosition = {
    row: currentPosition.row + 1,
    col: currentPosition.col
  }

  return newPosition;
}

export function getLeftPosition(currentPosition, map) {
  const newPosition = {
    row: currentPosition.row,
    col: currentPosition.col - 1
  }

  return newPosition;
}

export function isSpaceValid(position, map) {

  if (map[position.row][position.col] === 0) {
    return true;
  } else {
    return false;
  }
}

// this function will place hero and monster characters in initial position
export function placeHero(map) {
  let randomLocation = {};
  let newMap = [...map];
  randomLocation = getRandomMapLocation(map);
  newMap[randomLocation.row][randomLocation.col] = 2;
  return randomLocation;
}

function getRandomMapLocation(map) {
  console.log(map[0].length);
  const ROW_LIMIT = map.length;
  const COL_LIMIT = map[0].length;
  let randomRow, randomCol, position;

  do {
  randomRow = Math.floor(Math.random() * ROW_LIMIT);
  randomCol = Math.floor(Math.random() * COL_LIMIT);
  console.log(randomRow, randomCol);
  position = {row: randomRow, col: randomCol}

} while (!(isSpaceValid(position, map)));

  return position;
}
