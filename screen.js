const blessed = require('blessed');
const contrib = require('blessed-contrib');

var program = blessed.program();
program.key('q', function(ch, key) {
    program.clear();
    program.disableMouse();
    program.showCursor();
    program.normalBuffer();
    process.exit('userEnded');
});

var terminalWidth = process.stdout.columns;
var terminalHeight = process.stdout.rows;
var screenWidth;
var screenHeight;

if (terminalHeight < 30){
    screenWidth = '80%';
    screenHeight = '75%';
} else {
    screenWidth = '80%';
    screenHeight = '80%';
}

function getScreen(){
    var screen = blessed.screen();
    screen.title = 'Hash-gen';
    return screen;
}

function getInfoBox(){
    var infoBox = blessed.box({
        top: 'center',
        left: 'center',
        width: `${screenWidth}`,
        height: `${screenHeight}`,
        content: ``,
        tags: true,
        padding: 2,
        border: {
            type: 'line'
        },
        style: {
            fg: 'black',
            bg: 'green',
            transparent: false,
            border: {
                fg: '#f0f0f0'
            }
        }
    });
    return infoBox;
}

function getProgressBar(){
    var progress = blessed.progressbar({
      border: 'line',
      style: {
        fg: 'blue',
        bg: 'default',
        bar: {
          bg: 'default',
          fg: 'green'
        },
        border: {
          fg: 'default',
          bg: 'default'
        }
      },
      ch: ':',
      width: '40%',
      height: 3,
      top: 1,
      left: 'center',
      filled: 0
    });
    return progress
}

module.exports = {
    getScreen: getScreen,
    getInfoBox: getInfoBox,
    getProgressBar: getProgressBar
};
