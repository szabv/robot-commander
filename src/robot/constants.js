const directions = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3
};

const directionLabels = {
  0: 'NORTH',
  1: 'EAST',
  2: 'SOUTH',
  3: 'WEST'
};

const commands = {
  PLACE: 'place',
  MOVE: 'move',
  LEFT: 'turnLeft',
  RIGHT: 'turnRight',
  REPORT: 'report'
};

export {
  directions,
  directionLabels,
  commands
}