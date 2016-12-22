require('./libs/rootRequire');
const bakery = global.rootRequire('bakery/bakery');
const cli = global.rootRequire('CLI/cli');

if (!module.parent) {
    cli().then((args) => {
        bakery.bake({args: args});
    });
}
