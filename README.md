# Robot-Commander
This code simulates a robot moving around in a 5x5 grid. Takes input from a file supplied as a command line argument. 

## Getting running
In a terminal run the following commands. It's assumed that git and node are installed. Please use the equivalent npm command if that is your package manager of choice. 

There are several input files that can be found in the test-files directory.

Get the code and install dependencies:
```
git clone https://github.com/szabv/robot-commander.git
cd robot-commander
yarn
```
Run the unit tests:
```
yarn test
```
Build the code:
```
yarn build
```

Once the code is built you can run it by doing one of the following.

Run it with yarn: 
```
yarn start ./test-files/wondering-robot.txt
```

Or directly (less noise in the output);
```
node ./dist/robot.js ./test-files/wondering-robot.txt
```