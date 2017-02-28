const converter = require('hex2dec');
const crypto = require('crypto');
const fs = require('fs');

var startInterger = "";

function setInteger(stringInt){
    startInterger = stringInt;
}

function generateHashes(hashType, targetHash, filepath){
    var hashType = hashType;
    var targetHash = targetHash;
    console.log(hashType, targetHash);
    var hashGenerator = setInterval(start, 10);
    function start(){
        var hexString = converter.decToHex(startInterger);
        hexString = hexString.replace("x", "");
        var hash = crypto.createHash(hashType).update(hexString).digest('hex');
        if (hash == targetHash){
            console.log('-- A MATCH FOR YOUR HASH VALUE HAS BEEN FOUND --\n');
            console.log(`Writing to ${filepath}...`);
            fs.appendFile(filepath, `Matched On Int: ${startInterger}\nHex Value: ${hexString}\nHash Type: ${hashType}\nHash: ${hash}\n\n`, (err) => {
                if (err) throw err;
                console.log('Sucessfully saved match.\n');
            });
            clearInterval(hashGenerator);
            return true;
        }
        // if (i == (loopIterations -1)){
            console.log(`\nInteger:    ${startInterger}`);
            console.log(`Hex Value:  ${hexString.replace("x", "")}`);
            console.log(`Hash Value: ${hash}\n`);
        // }
        // fs.appendFile(__dirname + '/log.txt', `${number}\n${hexString}\n${hash}\n\n`, (err) => {
        //     if (err) throw err;
        // });
        var lastFive = startInterger.substr(startInterger.length - 10);
        var zero = 0;
        if (lastFive.charAt(0) == "0"){
            lastFive = "1" + lastFive;
            zero = 1;
        }
        var lastFiveInt = parseInt(lastFive);
        if (lastFiveInt == 9999999999){
            console.log(`Exiting at ${number}`);
            fs.appendFile(__dirname + '/hash_matches.txt', `Exit on int: ${startInterger}\nHex value:${hexString}\nHash type:${hashType}\n${hash}\n\n`, (err) => {
                if (err) throw err;
                console.log('SAVED TO FILE... EXITING...');
            });
            clearInterval(hashGenerator);
        }
        lastFiveInt++;
        lastFive = lastFiveInt.toString();
        if (zero == 1){
            lastFive = lastFive.substr(1, lastFive.length);
        }
        var oldNum = startInterger.slice(0, (startInterger.length - 10));
        startInterger = oldNum + lastFive;
    }
}

module.exports = {hashes: generateHashes, setStart:setInteger};
