const converter = require('hex2dec');
const expect = require('expect.js');

describe('Hex converter', function(){
    it('shold convert a decimal number to a hex value', function(){
        var decimal = "1998";
        var hex = converter.decToHex(decimal);
        expect(hex).to.equal("0x7ce");
    });

    it('shold convert a hex to a decimal number', function(){
        var hex = "0x7ce";
        var decimal = converter.hexToDec(hex);
        expect(decimal).to.equal("1998");
    });
});
