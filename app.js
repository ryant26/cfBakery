global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
};

const cli = global.rootRequire('libs/CLI/cli');

if (!module.parent) {
    cli();
}
