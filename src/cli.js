const readline = require('readline');

module.exports = class Cli{
    constructor() {
        this._readline = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    start(startCallback, lineCallback, endCallback){
        startCallback();
        this._startPrompt();
        this._readline.on('line', async (line) => {
            await lineCallback(line);
            this._startPrompt();
        });
        this._readline.on('close', endCallback);
    }

    stop(){
        this._readline.close();
    }

    _startPrompt(){
        this._readline.setPrompt('FS-RDI>>');
        this._readline.prompt();
    }
}


