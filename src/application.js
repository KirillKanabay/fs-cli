const CommandDispatcher = require('./commandDispatcher');
const Cli = require('./cli');
const cp = require('./commandParser');
const pathService = require('./path/path.service');

module.exports = class Application {
    constructor() {
        this._commandDispatcher = new CommandDispatcher();
        this._cli = new Cli();
        this._appArgs = cp.parseArgv(process.argv);
    }

    addCommand(command){
        this._commandDispatcher.addCommand(command);
        return this;
    }

    addCommands(commands){
        commands.forEach(command => this.addCommand(command));
        return this;
    }

    listenConsole(){
        this._cli.start(
            this._greeting.bind(this),
            this._runCommandAsync.bind(this),
            this._farewell.bind(this));
    }

    printHelp(){
        console.log('Available commands:');
        this._commandDispatcher.getCommandsDescriptions()
            .forEach(command => console.log(`${command.name}: \n\t${command.description}`));
    }

    exit(){
        this._farewell();
        process.exit(0);
    }

    async _runCommandAsync(line){
        const command = cp.parseCommand(line);
        if(command) {
            await this._commandDispatcher.runCommandAsync(command);
        } else {
            console.error('Invalid command. Please try again with right one.');
        }
        this._printCurrentPath();
    }

    _greeting() {
        const userName = this._appArgs['username'];
        console.log(`Welcome to the awesome CLI${userName ? `, ${userName}` : ''}. To get help type .help`);
        this._printCurrentPath();
    }

    _farewell(){
        const userName = this._appArgs['username'];
        console.log(`Bye, bye. We will miss you${userName ? `, ${userName}` : ''}.`);
    }

    _printCurrentPath(){
        console.log(`You are currently in ${pathService.currentPath}`);
    }
}

