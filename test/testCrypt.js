const crypt = require('../crypt.js');
const expect = require('expect.js');

describe('Hash creation', function(){

    var input = "hash-gen";

    it('should output a sha1 hex hash', function(){
        var hash = crypt.hash(input, "sha1", "hex");
        expect(hash).to.equal("29ab96f16e406fe32daaae0e252e3181e8e50338");
    });

    it('should output a sha1 base64 hash', function(){
        var hash = crypt.hash(input, "sha1", "base64");
        expect(hash).to.equal("KauW8W5Ab+Mtqq4OJS4xgejlAzg=");
    });

    it('should output a sha256 hex hash', function(){
        var hash = crypt.hash(input, "sha256", "hex");
        expect(hash).to.equal("62e455b822ca521d9ebd74c452f135c2fd75d7c41bd734109c145fab1d3f43b7");
    });

    it('should output a sha256 base64 hash', function(){
        var hash = crypt.hash(input, "sha256", "base64");
        expect(hash).to.equal("YuRVuCLKUh2evXTEUvE1wv1118Qb1zQQnBRfqx0/Q7c=");
    });

    it('should output a sha512 hex hash', function(){
        var hash = crypt.hash(input, "sha512", "hex");
        expect(hash).to.equal("71fde3fdbb7f016b6547715472aee938831e261f778018c58efa3f678b4660c0d266fe0ee16feb94c0a0705470b491898e63c75d377f2e45a3f3cab6a2fb3172");
    });

    it('should output a sha512 base64 hash', function(){
        var hash = crypt.hash(input, "sha512", "base64");
        expect(hash).to.equal("cf3j/bt/AWtlR3FUcq7pOIMeJh93gBjFjvo/Z4tGYMDSZv4O4W/rlMCgcFRwtJGJjmPHXTd/LkWj88q2ovsxcg==");
    });

    it('should output a whirlpool hex hash', function(){
        var hash = crypt.hash(input, "whirlpool", "hex");
        expect(hash).to.equal("10f039c124c735e38d9edf079c475e01c39d4c18f5c884ca65426080565e1ceec81a33e2a888e47c3bef88732dae8ad735a952c70b7c8a66b69b3086ce37395d");
    });

    it('should output a whirlpool base64 hash', function(){
        var hash = crypt.hash(input, "whirlpool", "base64");
        expect(hash).to.equal("EPA5wSTHNeONnt8HnEdeAcOdTBj1yITKZUJggFZeHO7IGjPiqIjkfDvviHMtrorXNalSxwt8ima2mzCGzjc5XQ==");
    });

});
