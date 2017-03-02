const crypto = require('crypto');

function hash(input, hashType, digest){
    var hash = crypto.createHash(hashType).update(input).digest(digest);
    return hash;
}

var hashes = ['md4', 'md5', 'mdc2', 'sha', 'sha1', 'sha224', 'sha256', 'sha384', 'sha512', 'dss1', 'ripemd', 'ripemd160', 'rmd160', 'whirlpool'];

module.exports = {
    hash: hash,
    hashes: hashes
}
