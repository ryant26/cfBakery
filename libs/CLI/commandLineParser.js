const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');

let CommandLineParser = function() {
    const optionDefinitions = [
        {name: 'cfUser', alias: 'u', type: String},
        {name: 'cfPassword', alias: 'p', type: String},
        {name: 'globalPassword', alias: 'G', type: String},
        {name: 'help', alias: 'h', type: Boolean},
    ];

    /**
     * Returns a console.log-able object detailing CLI use
     * @return {*}
     */
    this.getUsage = function() {
        return commandLineUsage([
            {
                header: 'cfBakery:',
                content: 'A tool for automating infrastructure setup on the cloud foundry platform.',
            },
            {
                header: 'Options',
                optionList: [
                    {
                        name: optionDefinitions[0].name,
                        alias: optionDefinitions[0].alias,
                        typeLabel: '[underline]{String}',
                        description: 'Your cf username (same as cf CLI)',
                    },
                    {
                        name: optionDefinitions[1].name,
                        alias: optionDefinitions[1].alias,
                        typeLabel: '[underline]{String}',
                        description: 'Your cf password (same as cf CLI)',
                    },
                    {
                        name: optionDefinitions[2].name,
                        alias: optionDefinitions[2].alias,
                        typeLabel: '[underline]{String}',
                        description: 'A password for all UAA users / clients',
                    },
                    {
                        name: optionDefinitions[3].name,
                        alias: optionDefinitions[3].alias,
                        description: 'Show this help message',
                    },
                ],
            },
        ]);
    };

    /**
     * Returns an object containing all present command line arguments
     * @return {*}
     */
    this.getArgs = function() {
        return commandLineArgs(optionDefinitions);
    };
};

module.exports = CommandLineParser;
