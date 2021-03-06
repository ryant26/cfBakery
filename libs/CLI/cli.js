let clp = global.rootRequire('CLI/commandLineParser');
let UserInteractionManager = global.rootRequire('CLI/userInteractionManager');

/**
 * Starts the CLI:
 * - Parses command line arguments
 * - Prompts the user for missing arguments
 * @constructor
 */
let CLI = function() {
    let args = clp.getArgs();

    if (args.help) {
        console.log(clp.getUsage());
        process.exit(0);
    }

    let uim = new UserInteractionManager({
        requiredArgs: [{name: 'cfUser', inputType: 'input'},
            {name: 'cfPassword', inputType: 'password'},
            {name: 'endpoint', inputType: 'input'}],
        args: args,
    });

    return uim.getAllRequiredArguments();
};

module.exports = CLI;
