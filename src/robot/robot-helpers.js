import { directions } from "./constants";

const isOnEdge = (tableSize, position, facing) => {
  switch (facing) {
    case directions.NORTH:
      return position.y === tableSize - 1;
    case directions.EAST: 
      return position.x  === tableSize - 1;
    case directions.SOUTH:
      return position.y === 0;
    case directions.WEST: 
      return position.x === 0;
    default: 
      throw new Error('Facing invalid direction.');
  }
}

const isPositionOnTable = (tableSize, position) => {
  return position.x >= 0 && position.x < tableSize && position.y >= 0 && position.y < tableSize;
}

const doMoveToNewPosition = (position, facing) => {
  const newPosition = { ...position };

  switch (facing) {
    case directions.NORTH:
      newPosition.y++;
      break;
    case directions.EAST: 
      newPosition.x++;
      break;
    case directions.SOUTH:
      newPosition.y--;
      break;
    case directions.WEST: 
      newPosition.x--;
      break;
    default:
      throw new Error('Unknown direction passed to doMoveToNewPosition.');
  }

  return newPosition;
}

export { 
  isOnEdge,
  isPositionOnTable,
  doMoveToNewPosition
}