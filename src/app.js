import fs from 'fs';
import { Robot } from './robot';
import { commands, directionLabels } from './robot/constants'
import { parsCommand } from './command-parser';

const readTextFile = (fileName) => {
  var contents = fs.readFileSync(fileName, 'utf8');
  return contents;
};

const getCommands = () => {
  const params = process.argv.slice(2);
  return readTextFile(params[0]).split('\n');
};

const getResultString = robotPlacement => {
  return `${robotPlacement.position.x},${robotPlacement.position.y},${directionLabels[robotPlacement.facing]}`;
}

const showRobotPlacement = robotPlacement => {
  console.log(getResultString(robotPlacement));
}

const executeCommands = (robot, commandsArray, outputReportPlugin) => {
  commandsArray.map(command => {
    const commandObject = parsCommand(command)

    // If it's a valid command pass it to the robot.
    if(commandObject.command) {
      if(commandObject.command === commands.PLACE ){
        robot.place(commandObject.position.x, commandObject.position.y, commandObject.facing);
      } else if (commandObject.command === commands.REPORT) {
        const robotPlacement = robot.getPlacement();
        if(robotPlacement.onTable){
          outputReportPlugin(robotPlacement);
        }
      } else {
        robot[commandObject.command]();
      }
    }
  });
}

const runAppWithIOPlugins = (getCommandsPlugin, outputReportPlugin) => {
  const robot = new Robot();
  const commandsArray = getCommandsPlugin();
  executeCommands(robot, commandsArray, outputReportPlugin);
};

const runApp = () => { 
  runAppWithIOPlugins(getCommands, showRobotPlacement);
}

export {
  runApp,
  runAppWithIOPlugins,
  getResultString
};