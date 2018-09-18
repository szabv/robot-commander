import { parsCommand } from './index';
import { directions, commands } from "../robot/constants";

describe('Parses commands from a string into a format that can be passed to Robot', () => {
  test('PLACE 0,0,NORTH', () => {
    const inputString = 'PLACE 0,0,NORTH';
    const result = parsCommand(inputString);

    expect(result.command).toBe(commands.PLACE);
    expect(result.position.x).toBe(0);
    expect(result.position.y).toBe(0);
    expect(result.facing).toBe(directions.NORTH);
  });

  test('PLACE -1,0,EAST', () => {
    const inputString = 'PLACE -1,0,EAST';
    const result = parsCommand(inputString);

    expect(result.command).toBe(commands.PLACE);
    expect(result.position.x).toBe(-1);
    expect(result.position.y).toBe(0);
    expect(result.facing).toBe(directions.NORTH);
  });

  test('MOVE', () => {
    const inputString = 'MOVE';
    const result = parsCommand(inputString);

    expect(result.command).toBe(commands.MOVE);
  });

  test('LEFT', () => {
    const inputString = 'LEFT';
    const result = parsCommand(inputString);

    expect(result.command).toBe(commands.LEFT);
  });

  test('Badly formatted commands return null;', () => {
    const inputString = 'GARBAGE';
    const result = parsCommand(inputString);

    expect(result.command).toBe(null);
  });

  test('PLACE must have valid params to parse.', () => {
    const inputString = 'PLACE';
    const result = parsCommand(inputString);

    expect(result.command).toBe(null);
  });

  test('PLACE params must be correctly formatted', () => {
    const inputString = 'PLACE 0,x,NORTH';
    const result = parsCommand(inputString);

    expect(result.command).toBe(null);
  });

  test('PLACE requires x y and facing value to ve valid', () => {
    const inputString = 'PLACE 0,NORTH';
    const result = parsCommand(inputString);

    expect(result.command).toBe(null);
  });

  test('PLACE facing value to ve valid', () => {
    const inputString = 'PLACE 0,0';
    const result = parsCommand(inputString);

    expect(result.command).toBe(null);
  });
});
