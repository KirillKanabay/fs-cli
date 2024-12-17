class OSService{
    constructor() {
        this._os = require('os');
    }

    printEOL(){
        console.log(JSON.stringify(this._os.EOL));
    }

    printCpus(){
        const cpus = this._os.cpus();
        console.log('Amount of CPUs:', cpus.length);
        cpus.forEach((cpu) => {
            console.log(`Model: ${cpu.model}, Clock rate: ${(cpu.speed / 1000).toFixed(3)} GHz`);
        })
    }

    printHomeDir(){
        console.log(this._os.homedir());
    }

    printUserName(){
        console.log(this._os.userInfo().username);
    }

    printArchitecture(){
        console.log(this._os.arch());
    }
}

module.exports = new OSService();