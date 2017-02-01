

import * as helpers from '/.helpers';

export default function(event) {

  switch (event.keyCode) {

    case UP_KEY:
      console.log('up');
      helpers.moveUp
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
