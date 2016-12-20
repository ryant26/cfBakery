global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
};
let CommandLineParser = rootRequire('libs/commandLineParser');

let clp = new CommandLineParser();
let args = clp.getArgs();

if(args.help) {
    console.log(clp.getUsage());
    process.exit(0);
}
