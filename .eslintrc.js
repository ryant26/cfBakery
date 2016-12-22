module.exports = {
    "extends": ["eslint:recommended", "google"],
    "env": {
        "node": true,
        "es6": true,
        "mocha": true,
    },
    "rules": {
        "max-len": ["warn", 200],
        "no-console": "off",
    }
};