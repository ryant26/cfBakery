global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
};

let CLI = rootRequire('libs/CLI/cli');

if (!module.parent) {
    CLI();
}