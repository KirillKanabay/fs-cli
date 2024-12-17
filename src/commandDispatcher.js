module.exports = class CommandDispatcher{
    constructor() {
        this.commands = {};
    }

    addCommand(command){
        this.commands[command.name] = command;
    }

    async runCommandAsync({name, params, args}){
        const command = this.commands[name];
        if(this._validate(command, params, args)){
            try {
                await command.handler(name, params, args);
            } catch(e) {
                console.error(e);
                console.error(`Operation failed ${name}`);
            }
        } else {
            console.error(`Invalid command. Please try again with right one`);
        }
    }

    getCommandsDescriptions(){
        return Object.values(this.commands).map(command => ({
            name: command.name,
            description: command.commandDescription
        }));
    }

    _validate(command, params, args){
        return command &&
            (!command.requiredParams || command.requiredParams === params.length) &&
            (!command.allowedArgs || args.every(arg => command.allowedArgs.includes(arg)));
    }
}