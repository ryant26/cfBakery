const EventEmitter = require('events');
const cfClient = require('cf-nodejs-client');
const chalk = require('chalk');

const em = new EventEmitter();

let Bakery = {
    on: em.on,

    /**
     * This is a string
     * @param {Object} options
     * @param {Boolean} options.args.delete
     * @param {String} options.args.cfUser
     * @param {String} options.args.cfPassword
     * @param {String} options.args.globalPassword
     * @param {String} options.args.endpoint
     * @param {Object} options.cloudConfig
     * @return {Promise} a finished promise
     */
    bake: function(options) {
        console.log(`logging into endpoint: ${chalk.cyan(options.args.endpoint)}`);
        const CloudController = new cfClient.CloudController(options.args.endpoint);
        const Apps = new (require("cf-nodejs-client")).Apps(options.args.endpoint);

        CloudController.getInfo().then((result) => {
           let resy = result;
        });
        return new Promise();
    },
};

module.exports = Bakery;
