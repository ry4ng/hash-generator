const commandLineArgs = require('command-line-args');

var optionDefentions = [{
        name: 'hash',
        alias: 'h',
        type: String,
        defaultValue: "sha256"
    },
    {
        name: 'target',
        alias: 't',
        type: String
    },
    {
        name: 'start',
        alias: 's',
        type: String,
        defaultValue: "1"
    },
    {
        name: 'delay',
        alias: 'd',
        type: String,
        defaultValue: "5"
    },
    {
        name: 'log',
        alias: 'l',
        type: Boolean
    },
    {
        name: 'verbose',
        alias: 'V',
        type: Boolean
    },
    {
        name: 'help',
        type: Boolean
    },
    {
        name: 'ssh',
        type: Boolean
    },
    {
        name: 'create',
        alias: 'c',
        type: Boolean
    }
];

function getArgs(){
    var args = commandLineArgs(optionDefentions);
    return args;
}

module.exports = {
    getArgs: getArgs,
};
