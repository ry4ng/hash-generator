#! /usr/bin/env node
const fs = require('fs');
const keypress = require('keypress');

// Internal Modules
const generate = require('./generate');
const options = require('./options');
const screen = require('./screen');
const help = require('./help');
const crypt = require('./crypt');

var args = options.getArgs();

if (args.help) {
    help.show();
}

if (!args.target && !args.help && args.create == undefined) {
    console.log("\nHash-gen has been successfully installed! Time to get hashing.\n");
    process.exit(-1);
}

var hashType = args.hash || "sha256";
hashType = hashType.toLowerCase();
var targetHash = args.target;
if (targetHash){
    targetHash = targetHash.toLowerCase();
}
var create = args.create;
var startInterger = args.start;
var delay = args.delay;
var log = args.log;
var verbose = args.verbose;
var ssh = args.ssh;

if (create){
    if (crypt.hashes.indexOf(hashType) > -1){
        var input = create;
        var digest = args.digest;
        console.log(`\nInput: ${input}\n`);
        console.log(`Algorithm: ${hashType}`);
        console.log(`Digest: ${digest}\n`);

        var hash = crypt.hash(input, hashType, digest);

        console.log('---------------------------Hash output---------------------------\n');
        console.log(`${hash}\n`);
        console.log('---------------------------Hash output---------------------------\n');
        process.exit('hashCreated');
    } else {
        console.log('\nUnsupported hash algorithm.');
        console.log('Please refer to https://www.npmjs.com/package/hash-gen for a list of currently supported hash algorithim\'s\n');
        process.exit(-1);
    }
}

if (targetHash){
    var mainScreen = screen.getScreen();
    var infoBox = screen.getInfoBox();
    var progressBar = screen.getProgressBar();
    mainScreen.append(infoBox);
    mainScreen.append(progressBar);

    infoBox.insertTop(`{center}{underline}Welcome to Hash-gen - v2.5.14{/underline}{/center}`);
    infoBox.insertLine("1", ``);
    infoBox.insertLine("2", `{bold}Hash Type:{/bold}   ${hashType}`);
    infoBox.insertLine("3", `{bold}Target Hash:{/bold} ${targetHash}`);
    infoBox.insertLine("4", `{bold}Starting At:{/bold} ${args.start}`);
    mainScreen.render();
    infoBox.insertBottom("{bold}Delay:{/bold}    " + delay + "ms");
    mainScreen.render();
    if (log == true){
        infoBox.insertBottom("{bold}Log:{/bold}      " + log);
    } else {
        infoBox.insertBottom("{bold}Log:{/bold}      false");
    }
    if (verbose == true){
        infoBox.insertBottom("{bold}Verbose:{/bold}  " + verbose);
    } else {
        infoBox.insertBottom("{bold}Verbose:{/bold}  false");
    }
    if (ssh == true){
        infoBox.insertBottom("{bold}SSH Mode:{/bold} enabled");
    } else {
        infoBox.insertBottom("{bold}SSH Mode:{/bold} disabled");
    }

    var dir = './hash_logs';
    if (!fs.existsSync(dir)) {
        infoBox.insertBottom("");
        infoBox.insertBottom("{bold}Created folder:{/bold} " + process.cwd() + "/hash_logs");
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
        infoBox.insertBottom("");
        if (args.log == true){
            infoBox.insertBottom(`{bold}Matches & logs saved to:{/bold} ${process.cwd()}/${filepath}\n`);
        } else {
            infoBox.insertBottom(`{bold}Matches saved to:{/bold} ${process.cwd()}/${filepath}\n`);
        }
    });

    var progressValue = 0;
    var counter = 10;
    var countdown = setInterval(function() {
        if (counter < 0) {
            clearInterval(countdown);
            infoBox.insertBottom("");
            infoBox.insertBottom("{center}Press [q] to exit at any time{/center}");
            infoBox.insertBottom("{center}Press [return] to begin hashing...{/center}");
            mainScreen.render();

            keypress(process.stdin);
            process.stdin.on('keypress', function (ch, key) {
                if (key && key.name == 'enter') {
                    mainScreen.remove(infoBox);
                    mainScreen.remove(progressBar);
                    mainScreen.render();
                    generate.setStart(startInterger);
                    generate.hashes(hashType, targetHash, filepath, delay, log, verbose, ssh);
                    process.stdin.unref();
                }
            });
            process.stdin.setRawMode(true);
        } else {
            progressBar.setProgress(progressValue);
            mainScreen.render();
        }
        counter--;
        progressValue += 10;
    }, 200);
}

process.on('exit', (code) => {
    if (code == "matchFound"){
        console.log(`\n-- A MATCH FOR YOUR HASH VALUE HAS BEEN FOUND --\n\nCheck ${filepath} for the matching hex value!\n`);
    }
    if (code == "userEnded"){
        console.log(`Thank-you for using Hash-gen!\n`);
    }
});
