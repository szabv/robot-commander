import { directions } from "./constants";
import { isOnEdge, doMoveToNewPosition, isPositionOnTable } from "./robot-helpers";

const isIntegerGreaterThenNegOne = (value) => {
  return typeof value === 'number' && value > -1 && Math.floor(value) === value;
}

const placeParamsAreValid = (x, y, facing) => {
  // x and y must be positive integers
  // facing must be a key in directions
  return isIntegerGreaterThenNegOne(x) && isIntegerGreaterThenNegOne(y) && facing >= directions.NORTH && facing <= directions.WEST;
}

class Robot {
  constructor(tableSize) {
    this.onTable = false;
    this.position = {
      x: 0,
      y: 0
    }
    this.facing = directions.NORTH;
    this.tableSize = tableSize || 5;
  }
  
  move() {
    if(this.onTable && !isOnEdge(this.tableSize, this.position, this.facing)) {
      this.position = doMoveToNewPosition(this.position, this.facing);
      return true;
    }
    return false;
  }

  place(x, y, facing){
    if(placeParamsAreValid(x, y, facing)){
      const placementPosition = {x, y};
      if(isPositionOnTable(this.tableSize, placementPosition)){
        this.onTable = true;
        this.position = placementPosition;
        this.facing = facing;
        return true;
      }
    }

    return false;
  }

  // Compass directions are represented as integers from 0 to 3 
  // in clockwise order.
  turnLeft() {
    if(this.onTable){
      this.facing = this.facing === 0 ? 3 : --this.facing;
      return true;
    } 
    return false;
  }

  turnRight() {
    if(this.onTable){
      this.facing = this.facing === 3 ? 0 : ++this.facing;
      return true;
    } 
    return false;
  }

  // Where is the robot right now?
  getPlacement(){
    const placement = {
      onTable: this.onTable
    };

    if( this.onTable ){
      placement.position = { ...this.position }
      placement.facing = this.facing
    }

    return placement;
  }
}


export {
  Robot,
  isIntegerGreaterThenNegOne,
  placeParamsAreValid
};