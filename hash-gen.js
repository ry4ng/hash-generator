#! /usr/bin/env node

const fs = require('fs');
const commandLineArgs = require('command-line-args');
const generate = require('./generate');

const keypress = require('keypress');
const blessed = require('blessed');
const contrib = require('blessed-contrib');

// SCREEN SET UP

var screen = blessed.screen();
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

screen.title = 'Hash-gen';
var startScreen = blessed.box({
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

var progress = blessed.progressbar({
  parent: startScreen.box,
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

screen.append(startScreen);

// END SCREEN SET UP

var optionDefentions = [{
        name: 'hash',
        alias: 'h',
        type: String,
        defaultValue: "sha256"
    },
    {
        name: 'target',
        alias: 't',
        type: String
    },
    {
        name: 'start',
        alias: 's',
        type: String,
        defaultValue: "1"
    },
    {
        name: 'delay',
        alias: 'd',
        type: String,
        defaultValue: "5"
    },
    {
        name: 'log',
        alias: 'l',
        type: Boolean
    },
    {
        name: 'verbose',
        alias: 'V',
        type: Boolean
    },
    {
        name: 'help',
        type: Boolean
    },
    {
        name: 'ssh',
        type: Boolean
    }
];

var options = commandLineArgs(optionDefentions);

if (options.help == true) {
    console.log("\n-t, --target    The hash you are trying to find a match for.");
    console.log("-h, --hash      Type of hash e.g sha256, sha512 etc. (sha256 is default)");
    console.log("-s, --start     The number you would like to start at (1 is default).");
    console.log("-d, --delay     Delay in milliseconds between each hash (5 is default).\n");

    console.log("-l, --log       Keep a log of all created hashes to file (Can slow hash generation when ON).");
    console.log("-V, --Verbose   Verbose output (shows hex & hash)\n");
    process.exit(-1);
}

if (!options.target && !options.help == true) {
    console.log("\nHash-gen has been successfully installed! Time to get hashing.\n");
    process.exit(-1);
}
startScreen.insertTop(`{center}{underline}Welcome to Hash-gen - v2.5.14{/underline}{/center}`);


var hashType = options.hash || "sha256";
hashType = hashType.toLowerCase();
startScreen.insertLine("1", ``);
startScreen.insertLine("2", `{bold}Hash Type:{/bold}   ${hashType}`);
// console.log(`\nHash Type:   ${hashType}`);

var targetHash = options.target;
targetHash = targetHash.toLowerCase();
// console.log(`Target Hash: ${targetHash}\n`);
startScreen.insertLine("3", `{bold}Target Hash:{/bold} ${targetHash}`);
startScreen.insertLine("4", `{bold}Starting At:{/bold} ${options.start}`);
screen.render();

var startInterger = options.start;
generate.setStart(startInterger);

var delay = options.delay;
startScreen.insertBottom("{bold}Delay:{/bold}    " + delay + "ms");
screen.render();

var log = options.log;
if (log == true){
    startScreen.insertBottom("{bold}Log:{/bold}      " + log);
    screen.render();
} else {
    startScreen.insertBottom("{bold}Log:{/bold}      false");
    screen.render();
}

var verbose = options.verbose;
if (verbose == true){
    startScreen.insertBottom("{bold}Verbose:{/bold}  " + verbose);
    screen.render();
} else {
    startScreen.insertBottom("{bold}Verbose:{/bold}  false");
    screen.render();
}

var ssh = options.ssh;
if (ssh == true){
    startScreen.insertBottom("{bold}SSH Mode:{/bold} enabled");
    screen.render();
} else {
    startScreen.insertBottom("{bold}SSH Mode:{/bold} disabled");
    screen.render();
}

var dir = './hash_logs';
if (!fs.existsSync(dir)) {
    startScreen.insertBottom("");
    startScreen.insertBottom("{bold}Created folder:{/bold} " + process.cwd() + "/hash_logs");
    screen.render();
    // console.log("Created folder: " + process.cwd() + "/hash_logs");
    fs.mkdirSync(dir);
}

var fileContent = `${hashType} hash log\n\nTarget hash: ${targetHash}\n\n\n`;

var d = new Date();
var n = d.getTime();
n = n.toString().slice(8);
var filepath = `hash_logs/${hashType}-${n}.txt`;

fs.writeFile(filepath, fileContent, (err) => {
    if (err) throw err;
    startScreen.insertBottom("");
    if (options.log == true){
        startScreen.insertBottom(`{bold}Matches & logs saved to:{/bold} ${process.cwd()}/${filepath}\n`);
    } else {
        startScreen.insertBottom(`{bold}Matches saved to:{/bold} ${process.cwd()}/${filepath}\n`);
    }
    screen.render();
    // console.log(`Matches will be saved to: ${process.cwd()}/${filepath}\n`);
});

screen.append(progress);
screen.render();

var progressValue = 0;
var counter = 10;
var countdown = setInterval(function() {
    if (counter < 0) {
        clearInterval(countdown);
        startScreen.insertBottom("");
        startScreen.insertBottom("{center}Press [q] to exit at any time{/center}");
        startScreen.insertBottom("{center}Press [return] to begin hashing...{/center}");

        screen.render();
        keypress(process.stdin);
        process.stdin.on('keypress', function (ch, key) {
            if (key && key.name == 'enter') {
                screen.remove(startScreen);
                screen.remove(progress);
                screen.render();
                generate.hashes(hashType, targetHash, filepath, delay, log, verbose, ssh);
                process.stdin.unref();
            }
        });
        process.stdin.setRawMode(true);
    } else {
        progress.setProgress(progressValue);
        screen.render();
    }
    counter--;
    progressValue += 10;
}, 200);

process.on('exit', (code) => {
    if (code == "matchFound"){
        console.log(`\n-- A MATCH FOR YOUR HASH VALUE HAS BEEN FOUND --\n\nCheck ${filepath} for the matching hex value!\n`);
    }
    if (code == "userEnded"){
        console.log(`Thank-you for using Hash-gen!\n`);
    }
});
