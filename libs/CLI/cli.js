let CommandLineParser = rootRequire('libs/CLI/commandLineParser');
let UserInteractionManager = rootRequire('libs/CLI/userInteractionManager');


var CLI = function() {
    let clp = new CommandLineParser();
    let args = clp.getArgs();

    if (args.help) {
        console.log(clp.getUsage());
        process.exit(0);
    }

    let uim = new UserInteractionManager({
        requiredArgs: [{name: "cfUser", inputType: "input"}, {name: "cfPassword", inputType: "password"}],
        args: args
    });

    uim.getAllRequiredArguments();
};

module.exports = CLI;