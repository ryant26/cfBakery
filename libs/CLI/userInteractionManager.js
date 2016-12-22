const inquirer = require('inquirer');
const _ = require('lodash');

/**
 *
 * @param {{
 *  requiredArgs: [{
 *      name: String,
 *      inputType: String
 *  }],
 *  args: {}
 * }}config
 * @constructor
 */
let UserInteractionManager = function(config) {
    /**
     * Checks the differences between the args and required args
     * Prompts the user for any missing args
     * Returns a promise that when resolved contains all arguments
     * @return {Promise}
     */
    this.getAllRequiredArguments = function() {
        let out = _.merge({}, config.args);
        let questions = [];

        config.requiredArgs.forEach((arg) => {
            if (!out.hasOwnProperty(arg.name)) {
                questions.push({
                    type: arg.inputType,
                    name: arg.name,
                    message: arg.name + '>',
                });
            }
        });

        return new Promise((resolve) => {
            if (questions.length) {
                inquirer.prompt(questions).then((answers) => {
                    resolve(_.merge(out, answers));
                });
            } else {
                resolve(out);
            }
        });
    };
};

module.exports = UserInteractionManager;
