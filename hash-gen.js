#! /usr/bin/env node

const fs = require('fs');
const commandLineArgs = require('command-line-args');
const generate = require('./generate');

var optionDefentions = [
    { name: 'hash', alias: 'h', type: String, defaultValue: "sha256"},
    { name: 'target', alias: 't', type: String},
    { name: 'start', alias: 's', type: String, defaultValue: "1"},
    { name: 'delay', alias: 'd', type: String, defaultValue: "5"},
    { name: 'log', alias: 'l', type: Boolean},
    { name: 'verbose', alias: 'v', type: Boolean}
];

var options = commandLineArgs(optionDefentions);

// Set Hash Type e.g sha256
var hashType = options.hash || "sha256";
hashType = hashType.toLowerCase();
console.log(`\nHash Type:   ${hashType}`);

// Target Hash Value
var targetHash = options.target;
targetHash = targetHash.toLowerCase();
console.log(`Target Hash: ${targetHash}\n`);

// Set the initial Integer Value to start encrypting
var startInterger = options.start;
generate.setStart(startInterger);

// Delay in ms between hashes
var delay = options.delay;
// Whether to keep log of hashes
var log = options.log;
// Verbose
var verbose = options.verbose;

var dir = './hash_logs';

if (!fs.existsSync(dir)){
    console.log("Created folder: " + process.cwd() + "/hash_logs");
    fs.mkdirSync(dir);
}

var fileContent = `${hashType} hash log\n\nTarget hash: ${targetHash}\n\n\n`;

// The absolute path of the new file with its name
var d = new Date();
var n = d.getTime();
n = n.toString().slice(8);
var filepath = `hash_logs/${hashType}-${n}.txt`;

fs.writeFile(filepath, fileContent, (err) => {
    if (err) throw err;
    console.log(`Matches will be saved to: ${process.cwd()}/${filepath}\n`);
});

var counter = 5;
var countdown = setInterval(function() {
    if(counter <= 0) {
        clearInterval(countdown);
        generate.hashes(hashType, targetHash, filepath, delay, log, verbose);
    } else {
        console.log(`Starting hashing in ${counter.toString()} seconds.`);
    }
    counter--;
}, 1000);
