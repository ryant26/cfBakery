const parseArgs = require('minimist');
const commandLineUsage = require('command-line-usage');

let CommandLineParser = {
    /**
     * Returns a console.log-able object detailing CLI use
     * @return {*}
     */
    getUsage : function() {
        return commandLineUsage([
            {
                header: 'cfBakery:',
                content: 'A tool for automating infrastructure setup on the cloud foundry platform.',
            },
            {
                header: 'Options',
                optionList: [
                    {
                        name: 'cfUser',
                        alias: 'u',
                        typeLabel: '[underline]{String}',
                        description: 'Your cf username (same as cf CLI)',
                    },
                    {
                        name: 'cfPassword',
                        alias: 'p',
                        typeLabel: '[underline]{String}',
                        description: 'Your cf password (same as cf CLI)',
                    },
                    {
                        name: 'globalPassword',
                        alias: 'g',
                        typeLabel: '[underline]{String}',
                        description: 'A password for all UAA users / clients',
                    },
                    {
                        name: 'help',
                        alias: 'h',
                        description: 'Show this help message',
                    },
                ],
            },
        ]);
    },

    /**
     * Returns an object containing all present command line arguments
     * @return {*}
     */
    getArgs: function() {
        return parseArgs(process.argv.slice(2), {
            alias: {
                cfUser: 'u',
                cfPassword: 'p',
                globalPassword: 'g',
                help: 'h',
            },
        });
    },
};

module.exports = CommandLineParser;
