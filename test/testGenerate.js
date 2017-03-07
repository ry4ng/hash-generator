const expect = require('expect.js');
const generate = require('../generate.js');

describe('Hash matching', function(){

    var filepath = "hash_test/testdata.txt";
    var delay = "1";
    var log = false;
    var verbose = false;
    var ssh = true;
    var npmTest = true;

    it('should match a decimal value to a sha1 hash', function(done){
        var hashType = "sha1";
        var targetHash = "c9d24aeccc3dfdaf6b889b1319955b4b65e8b662";
        generate.setStart("1950");
        generate.hashes(hashType, targetHash, filepath, delay, log, verbose, ssh, npmTest, function(int, hex, hash){
            expect(int).to.equal("1998");
            expect(hex).to.equal("7ce");
            done();
        });
    });

    it('should match a decimal value to a sha256 hash', function(done){
        var hashType = "sha256";
        var targetHash = "20591be68f90775cb2823ce57e622611fed9103888afa62c1cbff6bb14e05522";
        generate.setStart("1950");
        generate.hashes(hashType, targetHash, filepath, delay, log, verbose, ssh, npmTest, function(int, hex, hash){
            expect(int).to.equal("1998");
            expect(hex).to.equal("7ce");
            done();
        });
    });

    it('should match a decimal value to a sha384 hash', function(done){
        var hashType = "sha384";
        var targetHash = "61576967461b6d1697c6bfed61772639930436d93c4b74cd591160942e5d716137e5526c6869ccf7c0fcee60645686af";
        generate.setStart("1950");
        generate.hashes(hashType, targetHash, filepath, delay, log, verbose, ssh, npmTest, function(int, hex, hash){
            expect(int).to.equal("1998");
            expect(hex).to.equal("7ce");
            done();
        });
    });


    it('should match a decimal value to a sha512 hash', function(done){
        var hashType = "sha512";
        var targetHash = "ddb2b589e09c667d12b1629689b7e8366ce005ad4c75ce5c99f45bf0a1b51f7aaebb406810ae2fdca987831ffc324c844626d37a6ade69869a6ba391d4208f17";
        generate.setStart("1950");
        generate.hashes(hashType, targetHash, filepath, delay, log, verbose, ssh, npmTest, function(int, hex, hash){
            expect(int).to.equal("1998");
            expect(hex).to.equal("7ce");
            done();
        });
    });

    it('should match a decimal value to a md5 hash', function(done){
        var hashType = "md5";
        var targetHash = "dc392fd5e4d37f7b9cab616184b92a82";
        generate.setStart("1950");
        generate.hashes(hashType, targetHash, filepath, delay, log, verbose, ssh, npmTest, function(int, hex, hash){
            expect(int).to.equal("1998");
            expect(hex).to.equal("7ce");
            done();
        });
    });

    it('should match a decimal value to a md4 hash', function(done){
        var hashType = "md4";
        var targetHash = "38ffe75d0bed11909abb8d19791be82a";
        generate.setStart("1950");
        generate.hashes(hashType, targetHash, filepath, delay, log, verbose, ssh, npmTest, function(int, hex, hash){
            expect(int).to.equal("1998");
            expect(hex).to.equal("7ce");
            done();
        });
    });

    it('should match a decimal value to a whirlpool hash', function(done){
        var hashType = "whirlpool";
        var targetHash = "6d676a01c21427b1e4cad690f8da91871d05257cd74e2eebc5fb3822b18d3cb4aa98c7fd0d19e15dd889380af13dede5ce251fcf1a9363851e38e3f6e8e8b97d";
        generate.setStart("1950");
        generate.hashes(hashType, targetHash, filepath, delay, log, verbose, ssh, npmTest, function(int, hex, hash){
            expect(int).to.equal("1998");
            expect(hex).to.equal("7ce");
            done();
        });
    });

});
