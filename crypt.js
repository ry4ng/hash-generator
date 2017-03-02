const crypto = require('crypto');

function hash(input, hashType, digest){
    var hash = crypto.createHash(hashType).update(input).digest(digest);
    return hash;
}

module.exports = {
    hash: hash
}
