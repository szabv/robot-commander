import { directions } from "../robot/constants";
import { commands } from "./constants";

const canParsAsInteger = (num) => {
  return parseFloat(num, 10) === parseInt(num, 10);
};

const parsCommand = (commandString) => {
  commandString = commandString.trim();
  const tokens = commandString.split(' ');

  const result = {
    command: null
  };

  const command = commands[tokens[0]];

  if(typeof command === 'undefined'){
    // command is not in commands hash so return null
    return result;
  } else if (tokens.length === 2 && command === commands.PLACE ){
    // Pars the parameters for the PLACE command
    const paramTokens = tokens[1].split(',');
    
    // Should be three parameters in the format 0,0,<facing>
    if(paramTokens.length === 3 && canParsAsInteger(paramTokens[0])
      && canParsAsInteger(paramTokens[1]) 
      && typeof directions[paramTokens[2]] !== undefined
    ){
      // If the parameters are valid create the result object.
      result.command = command;
      result.position = {
        x: parseInt(paramTokens[0], 10),
        y: parseInt(paramTokens[1], 10)
      };
      result.facing = directions[paramTokens[2]];
    }
  } else if (tokens.length === 1 && command !== commands.PLACE){
    // Any command except PLACE is valid    
    result.command = command;
  }

  return result;
};

export {
  parsCommand
}