import { runAppWithIOPlugins, getResultString } from './app';

describe('Integration test the app with the IO mocked out.', () => {
  test('PLACE 0,0,NORTH', () => {
    const getCommandsPluginMock = () => {
      return [
        'PLACE 0,0,NORTH',
        'MOVE',
        'REPORT'
      ];
    };
    
    const outPut = [];
    const outputReportPluginMock =  robotPlacement => {
      outPut.push(getResultString(robotPlacement));
    }

    runAppWithIOPlugins(getCommandsPluginMock, outputReportPluginMock);

    expect(outPut.length).toBe(1);
    expect(outPut[0]).toBe('0,1,NORTH');
  });

  test('PLACE 0,0,NORTH', () => {
    const getCommandsPluginMock = () => {
      return [
        'PLACE 0,0,NORTH',
        'LEFT',
        'REPORT'
      ];
    };
    
    const outPut = [];
    const outputReportPluginMock =  robotPlacement => {
      outPut.push(getResultString(robotPlacement));
    }

    runAppWithIOPlugins(getCommandsPluginMock, outputReportPluginMock);

    expect(outPut.length).toBe(1);
    expect(outPut[0]).toBe('0,0,WEST');
  });


  test('PLACE 0,0,NORTH', () => {
    const getCommandsPluginMock = () => {
      return [
        'PLACE 1,2,EAST',
        'MOVE',
        'MOVE',
        'LEFT',
        'MOVE',
        'REPORT'
      ];
    };
    
    const outPut = [];
    const outputReportPluginMock =  robotPlacement => {
      outPut.push(getResultString(robotPlacement));
    }

    runAppWithIOPlugins(getCommandsPluginMock, outputReportPluginMock);

    expect(outPut.length).toBe(1);
    expect(outPut[0]).toBe('3,3,NORTH');
  });
});