require('./libs/rootRequire');

const cli = global.rootRequire('CLI/cli');

if (!module.parent) {
    cli();
}
