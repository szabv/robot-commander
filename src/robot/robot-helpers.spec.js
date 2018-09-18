import { isOnEdge, isPositionOnTable, doMoveToNewPosition } from "./robot-helpers";
import { directions } from "./constants";

describe('With isOnEdge the robot can check if it\'s facing the edge of the table', () => {
  test('Not on edge.', () => {
    const tableSize = 5;
    const position = {
      x: 2,
      y: 2
    }
    const facing = directions.NORTH;

    const result = isOnEdge(tableSize, position, facing);

    expect(result).toBe(false);
  });

  test('Top of the table facing north is an edge.', () => {
    const tableSize = 5;
    const position = {
      x: 3,
      y: 4
    }
    const facing = directions.NORTH;

    const result = isOnEdge(tableSize, position, facing);

    expect(result).toBe(true);
  });

  test('Left side of the table facing west is an edge.', () => {
    const tableSize = 5;
    const position = {
      x: 0,
      y: 2
    }
    const facing = directions.WEST;

    const result = isOnEdge(tableSize, position, facing);

    expect(result).toBe(true);
  });

  test('Bottom of the table facing south is an edge.', () => {
    const tableSize = 5;
    const position = {
      x: 3,
      y: 0
    }
    const facing = directions.SOUTH;

    const result = isOnEdge(tableSize, position, facing);

    expect(result).toBe(true);
  });

  test('Bottom right side of the table facing East is an edge.', () => {
    const tableSize = 5;
    const position = {
      x: 4,
      y: 2
    }
    const facing = directions.EAST;

    const result = isOnEdge(tableSize, position, facing);

    expect(result).toBe(true);
  });
});

describe('isPositionOnTable checks if position passed in is a valid position on the table', () => {
  test('On table.', () => {
    const tableSize = 5;
    const position = {
      x: 2,
      y: 2
    }

    const result = isPositionOnTable(tableSize, position);

    expect(result).toBe(true);
  });

  test('Top edge of the table.', () => {
    const tableSize = 5;
    const position = {
      x: 3,
      y: 4
    }

    const result = isPositionOnTable(tableSize, position);

    expect(result).toBe(true);
  });

  test('Off the top edge of the table.', () => {
    const tableSize = 5;
    const position = {
      x: 3,
      y: 7
    }

    const result = isPositionOnTable(tableSize, position);

    expect(result).toBe(false);
  });

  test('Off the top left corner of the table.', () => {
    const tableSize = 5;
    const position = {
      x: -2,
      y: 7
    }

    const result = isPositionOnTable(tableSize, position);

    expect(result).toBe(false);
  });


  test('Off the top right corner of the table.', () => {
    const tableSize = 5;
    const position = {
      x: 8,
      y: 7
    }

    const result = isPositionOnTable(tableSize, position);

    expect(result).toBe(false);
  });

  test('Left edge of table..', () => {
    const tableSize = 5;
    const position = {
      x: 0,
      y: 2
    }

    const result = isPositionOnTable(tableSize, position);

    expect(result).toBe(true);
  });

  test('Off the bottom left corner of the table.', () => {
    const tableSize = 5;
    const position = {
      x: -2,
      y: -1
    }

    const result = isPositionOnTable(tableSize, position);

    expect(result).toBe(false);
  });


  test('Bottom edge of the table.', () => {
    const tableSize = 5;
    const position = {
      x: 3,
      y: 0
    }

    const result = isPositionOnTable(tableSize, position);

    expect(result).toBe(true);
  });

  test('Right side of the table.', () => {
    const tableSize = 5;
    const position = {
      x: 4,
      y: 2
    }

    const result = isPositionOnTable(tableSize, position);

    expect(result).toBe(true);
  });

  test('Off bottom of the table.', () => {
    const tableSize = 5;
    const position = {
      x: 3,
      y: -2
    }

    const result = isPositionOnTable(tableSize, position);

    expect(result).toBe(false);
  });

  test('Off bottom right of the table.', () => {
    const tableSize = 5;
    const position = {
      x: 9,
      y: -2
    }

    const result = isPositionOnTable(tableSize, position);

    expect(result).toBe(false);
  });
});


describe('doMoveToNewPosition calculates a move for the robot.', () => {
  test('Dose not consider the table size. So doesn\'t prevent moving off it. Assume table size is 5.', () => {
    const position = {
      x: 2,
      y: 4
    }
    const facing = directions.NORTH;

    const result = doMoveToNewPosition(position, facing);

    expect(result.x).toBe(2);
    expect(result.y).toBe(5);
  });

  test('Move north.', () => {
    const position = {
      x: 2,
      y: 2
    }
    const facing = directions.NORTH;

    const result = doMoveToNewPosition(position, facing);

    expect(result.x).toBe(2);
    expect(result.y).toBe(3);
  });

  test('Move east.', () => {
    const position = {
      x: 2,
      y: 2
    }
    const facing = directions.EAST;

    const result = doMoveToNewPosition(position, facing);

    expect(result.x).toBe(3);
    expect(result.y).toBe(2);
  });

  test('Move south.', () => {
    const position = {
      x: 2,
      y: 2
    }
    const facing = directions.SOUTH;

    const result = doMoveToNewPosition(position, facing);

    expect(result.x).toBe(2);
    expect(result.y).toBe(1);
  });

  test('Move west.', () => {
    const position = {
      x: 2,
      y: 2
    }
    const facing = directions.WEST;

    const result = doMoveToNewPosition(position, facing);

    expect(result.x).toBe(1);
    expect(result.y).toBe(2);
  });
});