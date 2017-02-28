#! /usr/bin/env node
const fs = require('fs');
const commandLineArgs = require('command-line-args');
const generate = require('./generate');

var optionDefentions = [
    { name: 'hash', alias: 'h', type: String, defaultValue: "sha256"},
    { name: 'target', alias: 't', type: String},
    { name: 'start', alias: 's', type: String, defaultValue: "1"},
];

var options = commandLineArgs(optionDefentions);

// var targetHash = options.target;
var service = options.service;
var link = options.link;
var quantity = options.quantity;
var order = options.order;

// Set Hash Type e.g sha256
var hashType = options.hash || "sha256";
hashType = hashType.toLowerCase();
console.log(`\nHash type:   ${hashType}`);

// Target Hash Value
var targetHash = options.target;
targetHash = targetHash.toLowerCase();
console.log(`Target hash: ${targetHash}\n`);

// Set the initial Integer Value to start encrypting
var startInterger = options.start;
generate.setStart(startInterger);

var fileContent = "Hash-gen matches.";

// The absolute path of the new file with its name
var d = new Date();
var n = d.getTime();
var filepath = `${hashType}-${n}.txt`;

fs.writeFile(filepath, fileContent, (err) => {
    if (err) throw err;
    console.log(`Hash matches will be saved to file: ${filepath}\n`);
});

var counter = 3;
var countdown = setInterval(function() {
    counter--;
    if(counter < 0) {
        clearInterval(countdown);
        generate.hashes(hashType, targetHash, filepath);
    } else {
        console.log(`Starting hashing in ${counter.toString()} seconds.`);
    }
}, 1000);
