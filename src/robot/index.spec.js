import { Robot, isIntegerGreaterThenNegOne, placeParamsAreValid } from './index';
import { directions } from "./constants";

describe('Test if a number is greater then negative one.', () => {
  test('1 is a positive integer.', () => {
    const value = 1;

    const result = isIntegerGreaterThenNegOne(value);

    expect(result).toBe(true);
  });

  test('0 is greater then negative one.', () => {
    const value = 0;

    const result = isIntegerGreaterThenNegOne(value);

    expect(result).toBe(true);
  });

  test('-1 is not greater then -1.', () => {
    const value = -1;

    const result = isIntegerGreaterThenNegOne(value);

    expect(result).toBe(false);
  });

  test('1.5 is not a positive integer.', () => {
    const value = 1.5;

    const result = isIntegerGreaterThenNegOne(value);

    expect(result).toBe(false);
  });
});

describe('Validate parameters to the place command.', () => {
  test('x and y are valid positive integers and facing is in directions', () => {
    const x = 0;
    const y = 0;
    const facing = directions.NORTH;

    const result = placeParamsAreValid(x, y, facing);

    expect(result).toBe(true);
  });

  test('x and y are valid positive integers but facing is not in directions', () => {
    const x = 3;
    const y = 4;
    const facing = 'NORTH EAST';

    const result = placeParamsAreValid(x, y, facing);

    expect(result).toBe(false);
  });

  test('y is string representations of integers and facing is in directions', () => {
    const x = 3;
    const y = '4';
    const facing = directions.NORTH;

    const result = placeParamsAreValid(x, y, facing);

    expect(result).toBe(false);
  });

  test('facing is not in directions because it\'s out of range', () => {
    const x = 3;
    const y = 4;
    const facing = 5;

    const result = placeParamsAreValid(x, y, facing);

    expect(result).toBe(false);
  });

  test('facing is not in directions because it\'s undefined', () => {
    const x = 3;
    const y = 4;
    const facing = undefined;

    const result = placeParamsAreValid(x, y, facing);

    expect(result).toBe(false);
  });
});

describe('Robot can be placed on the table.', () => {
  test('Valid placement command.', () => {
    const robot = new Robot(5);
    const x = 0;
    const y = 0;
    const facing = directions.NORTH;

    const result = robot.place(x, y, facing);
    expect(result).toBe(true);
    
    const placement = robot.getPlacement();
    expect(placement.onTable).toBe(true);
    expect(placement.position.x).toBe(0);
    expect(placement.position.y).toBe(0);
    expect(placement.facing).toBe(directions.NORTH);
  });

  test('Nothing happens if placement would be off the table.', () => {
    const robot = new Robot(5);
    const x = -1;
    const y = 0;
    const facing = directions.NORTH;

    const result = robot.place(x, y, facing);
    expect(result).toBe(false);
    
    const placement = robot.getPlacement();
    expect(placement.onTable).toBe(false);
    expect(placement.position).toBe(undefined);
    expect(placement.facing).toBe(undefined);
  });

  test('Nothing happens if the direction is unsupported.', () => {
    const robot = new Robot(5);
    const x = 0;
    const y = 0;
    const facing = 5;

    const result = robot.place(x, y, facing);
    expect(result).toBe(false);
    
    const placement = robot.getPlacement();
    expect(placement.onTable).toBe(false);
    expect(placement.position).toBe(undefined);
    expect(placement.facing).toBe(undefined);
  });

  test('Robot can\'t be placed again into an invalid location.', () => {
    const robot = new Robot(5);
    const placedCorrectly = robot.place(2, 2, directions.NORTH);
    expect(placedCorrectly).toBe(true);

    const x = 0;
    const y = 9;
    const facing = directions.SOUTH;

    const result = robot.place(x, y, facing);
    expect(result).toBe(false);
    
    const placement = robot.getPlacement();
    expect(placement.onTable).toBe(true);
    expect(placement.position.x).toBe(2);
    expect(placement.position.y).toBe(2);
    expect(placement.facing).toBe(directions.NORTH);
  });
});


describe('Robot can turn left and right to change the direction it faces.', () => {
  test('Robot can turn left from NORTH to WEST.', () => {
    const robot = new Robot(5);
    const placedCorrectly = robot.place(2, 2, directions.NORTH);
    expect(placedCorrectly).toBe(true);

    const result = robot.turnLeft();
    expect(result).toBe(true);
    
    const placement = robot.getPlacement();
    expect(placement.onTable).toBe(true);
    expect(placement.position.x).toBe(2);
    expect(placement.position.y).toBe(2);
    expect(placement.facing).toBe(directions.WEST);
  });

  test('Robot can turn left from WEST to SOUTH.', () => {
    const robot = new Robot(5);
    const placedCorrectly = robot.place(2, 2, directions.WEST);
    expect(placedCorrectly).toBe(true);

    const result = robot.turnLeft();
    expect(result).toBe(true);
    
    const placement = robot.getPlacement();
    expect(placement.onTable).toBe(true);
    expect(placement.position.x).toBe(2);
    expect(placement.position.y).toBe(2);
    expect(placement.facing).toBe(directions.SOUTH);
  });

  test('Robot can turn left from SOUTH to EAST.', () => {
    const robot = new Robot(5);
    const placedCorrectly = robot.place(2, 2, directions.SOUTH);
    expect(placedCorrectly).toBe(true);

    const result = robot.turnLeft();
    expect(result).toBe(true);
    
    const placement = robot.getPlacement();
    expect(placement.onTable).toBe(true);
    expect(placement.position.x).toBe(2);
    expect(placement.position.y).toBe(2);
    expect(placement.facing).toBe(directions.EAST);
  });

  test('Robot can turn left from SOUTH to EAST.', () => {
    const robot = new Robot(5);
    const placedCorrectly = robot.place(2, 2, directions.EAST);
    expect(placedCorrectly).toBe(true);

    const result = robot.turnLeft();
    expect(result).toBe(true);
    
    const placement = robot.getPlacement();
    expect(placement.onTable).toBe(true);
    expect(placement.position.x).toBe(2);
    expect(placement.position.y).toBe(2);
    expect(placement.facing).toBe(directions.NORTH);
  });

  test('Robot can turn right from NORTH to EAST.', () => {
    const robot = new Robot(5);
    const placedCorrectly = robot.place(2, 2, directions.NORTH);
    expect(placedCorrectly).toBe(true);

    const result = robot.turnRight();
    expect(result).toBe(true);
    
    const placement = robot.getPlacement();
    expect(placement.onTable).toBe(true);
    expect(placement.position.x).toBe(2);
    expect(placement.position.y).toBe(2);
    expect(placement.facing).toBe(directions.EAST);
  });

  test('Robot can turn right from EAST to SOUTH.', () => {
    const robot = new Robot(5);
    const placedCorrectly = robot.place(2, 2, directions.EAST);
    expect(placedCorrectly).toBe(true);

    const result = robot.turnRight();
    expect(result).toBe(true);
    
    const placement = robot.getPlacement();
    expect(placement.onTable).toBe(true);
    expect(placement.position.x).toBe(2);
    expect(placement.position.y).toBe(2);
    expect(placement.facing).toBe(directions.SOUTH);
  });

  test('Robot can turn right from SOUTH to WEST.', () => {
    const robot = new Robot(5);
    const placedCorrectly = robot.place(2, 2, directions.SOUTH);
    expect(placedCorrectly).toBe(true);

    const result = robot.turnRight();
    expect(result).toBe(true);
    
    const placement = robot.getPlacement();
    expect(placement.onTable).toBe(true);
    expect(placement.position.x).toBe(2);
    expect(placement.position.y).toBe(2);
    expect(placement.facing).toBe(directions.WEST);
  });

  test('Robot can turn right from WEST to NORTH.', () => {
    const robot = new Robot(5);
    const placedCorrectly = robot.place(2, 2, directions.WEST);
    expect(placedCorrectly).toBe(true);

    const result = robot.turnRight();
    expect(result).toBe(true);
    
    const placement = robot.getPlacement();
    expect(placement.onTable).toBe(true);
    expect(placement.position.x).toBe(2);
    expect(placement.position.y).toBe(2);
    expect(placement.facing).toBe(directions.NORTH);
  });

  test('Robot can\'t turn if it\'s not on the table.', () => {
    const robot = new Robot(5);

    const result = robot.turnRight();
    expect(result).toBe(false);
    
    const placement = robot.getPlacement();
    expect(placement.onTable).toBe(false);
    expect(placement.position).toBe(undefined);
    expect(placement.facing).toBe(undefined);
  });
});

describe('Robot can move to change it\'s position', () => {
  test('Robot can move North from 2,2 to 2,3.', () => {
    const robot = new Robot(5);
    const placedCorrectly = robot.place(2, 2, directions.NORTH);
    expect(placedCorrectly).toBe(true);

    const result = robot.move();
    expect(result).toBe(true);
    
    const placement = robot.getPlacement();
    expect(placement.onTable).toBe(true);
    expect(placement.position.x).toBe(2);
    expect(placement.position.y).toBe(3);
    expect(placement.facing).toBe(directions.NORTH);
  });

  test('Robot can move South from 2,2 to 2,1.', () => {
    const robot = new Robot(5);
    const placedCorrectly = robot.place(2, 2, directions.SOUTH);
    expect(placedCorrectly).toBe(true);

    const result = robot.move();
    expect(result).toBe(true);
    
    const placement = robot.getPlacement();
    expect(placement.onTable).toBe(true);
    expect(placement.position.x).toBe(2);
    expect(placement.position.y).toBe(1);
    expect(placement.facing).toBe(directions.SOUTH);
  });

  test('Robot can move South from 2,2 to 3,2.', () => {
    const robot = new Robot(5);
    const placedCorrectly = robot.place(2, 2, directions.EAST);
    expect(placedCorrectly).toBe(true);

    const result = robot.move();
    expect(result).toBe(true);
    
    const placement = robot.getPlacement();
    expect(placement.onTable).toBe(true);
    expect(placement.position.x).toBe(3);
    expect(placement.position.y).toBe(2);
    expect(placement.facing).toBe(directions.EAST);
  });

  test('Robot can move West from 2,2 to 1,2.', () => {
    const robot = new Robot(5);
    const placedCorrectly = robot.place(2, 2, directions.WEST);
    expect(placedCorrectly).toBe(true);

    const result = robot.move();
    expect(result).toBe(true);
    
    const placement = robot.getPlacement();
    expect(placement.onTable).toBe(true);
    expect(placement.position.x).toBe(1);
    expect(placement.position.y).toBe(2);
    expect(placement.facing).toBe(directions.WEST);
  });

  test('Robot can\'t walk off the table to the North from top left corner.', () => {
    const robot = new Robot(5);
    const placedCorrectly = robot.place(0, 4, directions.NORTH);
    expect(placedCorrectly).toBe(true);

    const result = robot.move();
    expect(result).toBe(false);
    
    const placement = robot.getPlacement();
    expect(placement.onTable).toBe(true);
    expect(placement.position.x).toBe(0);
    expect(placement.position.y).toBe(4);
    expect(placement.facing).toBe(directions.NORTH);
  });

  test('Robot can\'t walk off the table to the WEST from top left corner.', () => {
    const robot = new Robot(5);
    const placedCorrectly = robot.place(0, 4, directions.WEST);
    expect(placedCorrectly).toBe(true);

    const result = robot.move();
    expect(result).toBe(false);
    
    const placement = robot.getPlacement();
    expect(placement.onTable).toBe(true);
    expect(placement.position.x).toBe(0);
    expect(placement.position.y).toBe(4);
    expect(placement.facing).toBe(directions.WEST);
  });

  test('Robot can\'t walk off the table to the East from bottom right corner.', () => {
    const robot = new Robot(5);
    const placedCorrectly = robot.place(4, 0, directions.EAST);
    expect(placedCorrectly).toBe(true);

    const result = robot.move();
    expect(result).toBe(false);
    
    const placement = robot.getPlacement();
    expect(placement.onTable).toBe(true);
    expect(placement.position.x).toBe(4);
    expect(placement.position.y).toBe(0);
    expect(placement.facing).toBe(directions.EAST);
  });

  test('Robot can\'t walk off the table to the South from bottom right corner.', () => {
    const robot = new Robot(5);
    const placedCorrectly = robot.place(4, 0, directions.SOUTH);
    expect(placedCorrectly).toBe(true);

    const result = robot.move();
    expect(result).toBe(false);
    
    const placement = robot.getPlacement();
    expect(placement.onTable).toBe(true);
    expect(placement.position.x).toBe(4);
    expect(placement.position.y).toBe(0);
    expect(placement.facing).toBe(directions.SOUTH);
  });
});
