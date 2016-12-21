const inquirer = require('inquirer');
const _ = require('lodash');

var UserInteractionManager = function(config) {
    this.getAllRequiredArguments = function () {
        let out = _.merge({}, config.args);
        let questions = [];

        config.requiredArgs.forEach((arg) => {
            if (!out.hasOwnProperty(arg.name)){
                questions.push({
                    type: arg.inputType,
                    name: arg.name,
                    message: arg.name + ">"
                })
            }
        });

        return new Promise((resolve) => {
            inquirer.prompt(questions).then((answers) => {
               resolve(_.merge(out, answers))
            })
        });
    }
};

module.exports = UserInteractionManager;