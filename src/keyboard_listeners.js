const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;
const LEFT_KEY = 37;

export default function(event) {

  switch (event.keyCode) {

    case UP_KEY:
      console.log('up');
      break;

    case RIGHT_KEY:
      console.log('right');
      break;

    case DOWN_KEY:
      console.log('down');
      break;

    case LEFT_KEY:
      console.log('left');
      break;

    default:
      break;

  }

}
