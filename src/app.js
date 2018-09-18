import fs from 'fs';

const readTextFile = (fileName) => {
  var contents = fs.readFileSync(fileName, 'utf8');
  console.log(contents);

  return contents;
};

const getCommands = () => {
  const params = process.argv.slice(2);
  return readTextFile(params[0]).split('\n');
};

const runApp = async () => {
    const commands = getCommands();
    console.log(commands);
};

export { runApp };