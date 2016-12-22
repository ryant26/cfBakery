require('../../libs/rootRequire');
const expect = require('chai').expect;
const sinon = require('sinon');
const cli = global.rootRequire('CLI/cli');
const inquirer = require('inquirer');

let argumentPusher = function(arg, value) {
    process.argv.push(arg);
    process.argv.push(value);
};

let extractNames = function(array) {
    return array.map(function(elm) {
        return elm.name
    });
}

describe('CLI', function() {
    let originalArgv;

    before(function() {
        originalArgv = process.argv.slice();
    });

    afterEach(function() {
        if (inquirer.prompt.restore) {
            inquirer.prompt.restore();
        }

        if (console.log.restore) {
            console.log.restore();
        }

        if (process.exit.restore) {
            process.exit.restore();
        }
        process.argv = originalArgv.slice();
    });

    it('Should prompt for cfUser & cfPassword both are missing', function(done) {
        sinon.stub(inquirer, 'prompt', function(question) {
            expect(question[0].message).to.equal('cfUser>');
            expect(question[1].message).to.equal('cfPassword>');
            done();
        });
        cli();
    });

    it('Should prompt for cfPassword when missing', function(done) {
        sinon.stub(inquirer, 'prompt', function(question) {
           expect(question[0].message).to.equal('cfPassword>');
            done();
        });

        process.argv.push('--cfUser');
        process.argv.push('supMan');
        cli();
    });

    it('Should not prompt for cfPassword --cfPassword present', function(done) {
        sinon.stub(inquirer, 'prompt', function(question) {
            let names = extractNames(question);
            expect(names).to.not.contain('cfPassword>');
            done();
        });

        process.argv.push('--cfPassword');
        process.argv.push('supMan');
        cli();
    });

    it('Should not prompt for cfPassword -p present', function(done) {
        sinon.stub(inquirer, 'prompt', function(question) {
            let names = extractNames(question);
            expect(names).to.not.contain('cfPassword>');
            done();
        });

        process.argv.push('-p');
        process.argv.push('supMan');
        cli();
    });

    it('Should prompt for cfUser when missing', function(done) {
        sinon.stub(inquirer, 'prompt', function(question) {
            expect(question[0].message).to.equal('cfUser>');
            done();
        });

        process.argv.push('--cfPassword');
        process.argv.push('supMan');
        cli();
    });

    it('Should not prompt for cfUser --cfUser present', function(done) {
        sinon.stub(inquirer, 'prompt', function(question) {
            let names = extractNames(question);
            expect(names).to.not.contain('cfUser>');
            done();
        });

        process.argv.push('--cfUser');
        process.argv.push('supMan');
        cli();
    });

    it('Should not prompt for cfUser -u present', function(done) {
        sinon.stub(inquirer, 'prompt', function(question) {
            let names = extractNames(question);
            expect(names).to.not.contain('cfUser>');
            done();
        });

        process.argv.push('-u');
        process.argv.push('supMan');
        cli();
    });

    it('should print the help when the -h flag is present', function(done) {
        let consoleCalled = false;
        sinon.stub(console, 'log', function() {
            consoleCalled = true;
            console.log.restore();
        });
        sinon.stub(process, 'exit', function(code) {
            expect(code).to.equal(0);
            expect(consoleCalled).to.be.true;
            done();
        });

        sinon.stub(inquirer, 'prompt');

        process.argv.push('-h');
        cli();
    });

    it('should print the help when the -help flag is present', function(done) {
        let consoleCalled = false;
        sinon.stub(console, 'log', function() {
            consoleCalled = true;
            console.log.restore();
        });

        sinon.stub(process, 'exit', function(code) {
            expect(code).to.equal(0);
            expect(consoleCalled).to.be.true;
            done();
        });

        sinon.stub(inquirer, 'prompt');

        process.argv.push('--help');
        cli();
    });

    it('should pass out all arguments present at command line', function(done) {
        sinon.stub(inquirer, 'prompt');
        let username = 'user';
        let password = 'password';
        let endpoint = 'endpoint';
        argumentPusher('-u', username);
        argumentPusher('-p', password);
        argumentPusher('-e', endpoint);
        cli().then(function(args) {
            expect(args['cfUser']).to.equal(username);
            expect(args['cfPassword']).to.equal(password);
            done();
        });
    });

    it('should pass out all arguments present at command line and prompted', function(done) {
        let username = 'user';
        let password = 'password';
        argumentPusher('-u', username);

        sinon.stub(inquirer, 'prompt', function(questions) {
            return new Promise(function(resolve) {
                resolve({cfPassword: password});
            });
        });

        cli().then(function(args) {
            expect(args['cfUser']).to.equal(username);
            expect(args['cfPassword']).to.equal(password);
            done();
        });
    });
});
