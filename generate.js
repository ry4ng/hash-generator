const converter = require('hex2dec');
const crypto = require('crypto');
const fs = require('fs');

// const blessed = require('blessed');
// const contrib = require('blessed-contrib');

var startInterger = "";

function setInteger(stringInt) {
    startInterger = stringInt;
}

function generateHashes(hashType, targetHash, filepath, delay, log, verbose) {
    var hashType = hashType;
    var targetHash = targetHash;

    // var screen = blessed.screen();
    // grid = new contrib.grid({rows: 5, cols: 2, screen: screen});
    // var output;
    // var windowWidth = process.stdout.columns;
    // var windowHeight = process.stdout.rows;
    //
    // if (windowWidth < 80){
    //     if (windowHeight <= 30){
    //         output = grid.set(0, 0, 5, 2, contrib.log, {fg: "green", selectedFg: "green", label: 'Hash Log'});
    //     } else {
    //         output = grid.set(0, 0, 4, 2, contrib.log, {fg: "green", selectedFg: "green", label: 'Hash Log'});
    //     }
    // } else if (windowWidth > 150){
    //     if (windowHeight <= 30){
    //         output = grid.set(0, 0, 5, 1, contrib.log, {fg: "green", selectedFg: "green", label: 'Hash Log'});
    //     } else {
    //         output = grid.set(0, 0, 4, 1, contrib.log, {fg: "green", selectedFg: "green", label: 'Hash Log'});
    //     }
    // } else {
    //     if (windowHeight <= 30){
    //         output = grid.set(0, 0, 5, 1.4, contrib.log, {fg: "green", selectedFg: "green", label: 'Hash Log'});
    //     } else {
    //         output = grid.set(0, 0, 4, 1.4, contrib.log, {fg: "green", selectedFg: "green", label: 'Hash Log'});
    //     }
    // }

    // screen.append(output);

    var hashGenerator = setInterval(start, delay);

    function start() {

        var hexString = converter.decToHex(startInterger);
        hexString = hexString.replace("x", "");
        var hash = crypto.createHash(hashType).update(hexString).digest('hex');

        if (hash == targetHash) {
            console.log('\n-- A MATCH FOR YOUR HASH VALUE HAS BEEN FOUND --\n');
            console.log(`Writing to ${process.cwd()}/${filepath}...`);
            fs.appendFile(filepath, `Matched On Int: ${startInterger}\nHex Value: ${hexString}\nHash Type: ${hashType}\nHash: ${hash}\n\n`, (err) => {
                if (err) throw err;
                console.log('Successfully saved match.\n');
                process.exit('matchFound');
            });
            clearInterval(hashGenerator);
        }

        console.log(`\nInt:  ${startInterger}`);
        if (verbose == true) {
            // output.log("");
            // output.log("Int:  " + startInterger);
            // output.log("Hex:  " + hexString.replace("x", ""));
            // output.log("Hash: " + hash + "");
            // output.log("");
            // screen.render();
            console.log(`Hex:  ${hexString.replace("x", "")}`);
            console.log(`Hash: ${hash}\n`);
        }

        if (log == true) {
            fs.appendFileSync(filepath, `${hexString.replace("x", "")}\n`);
            fs.appendFileSync(filepath, `${hash}\n\n`);
        }

        if (startInterger.length > 15) {
            var lastFive = startInterger.substr(startInterger.length - 10);
            var zero = 0;
            if (lastFive.charAt(0) == "0") {
                lastFive = "1" + lastFive;
                zero = 1;
            }
            var lastFiveInt = parseInt(lastFive);
            if (lastFiveInt == 9999999999) {
                console.log(`Exiting at ${number}`);
                fs.appendFile(__dirname + '/hash_matches.txt', `Exit on int: ${startInterger}\nHex value:${hexString}\nHash type:${hashType}\n${hash}\n\n`, (err) => {
                    if (err) throw err;
                    console.log('SAVED TO FILE... EXITING...');
                });
                clearInterval(hashGenerator);
            }
            lastFiveInt++;
            lastFive = lastFiveInt.toString();
            if (zero == 1) {
                lastFive = lastFive.substr(1, lastFive.length);
            }
            var oldNum = startInterger.slice(0, (startInterger.length - 10));
            startInterger = oldNum + lastFive;
        }

        var int = parseInt(startInterger);
        int++;
        startInterger = int.toString();

    }

}

module.exports = {
    hashes: generateHashes,
    setStart: setInteger
};
