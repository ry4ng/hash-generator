const converter = require('hex2dec');
const crypto = require('crypto');
const fs = require('fs');

var startInterger = "";

function setInteger(stringInt) {
    startInterger = stringInt;
}

function generateHashes(hashType, targetHash, filepath, delay, log, verbose, ssh) {
    var hashType = hashType;
    var targetHash = targetHash;

    if (ssh == true){
        console.log('\n SSH mode enabled.');
        console.log('\n Started hashing...');
    }
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

        if (ssh != true){
            if (verbose == true) {
                console.log(`\nInt:  ${startInterger}`);
                console.log(`Hex:  ${hexString.replace("x", "")}`);
                console.log(`Hash: ${hash}\n`);
            } else {
                console.log(`${hash}`);
            }
        }

        if (log == true) {
            fs.appendFileSync(filepath, `${startInterger}\n`);
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
