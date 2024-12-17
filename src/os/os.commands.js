const osService = require('./os.service');

const osCommands = [
    {
        name: 'os',
        requiredParams: 0,
        allowedArgs: ['EOL', 'cpus', 'homedir', 'username', 'architecture'],
        commandDescription: 'Print OS information. Syntax: os --<EOL|cpus|homedir|username|architecture>' +
            '\n\tEOL - Get default system Edn-Of-Line (EOL)' +
            '\n\tcpus - Get host machine CPUs info' +
            '\n\thomedir - Get home directory' +
            '\n\tusername - Get current system user name' +
            '\n\tarchitecture - Get CPU architecture',
        handler: (name, params, args) => {
            const [arg] = args;
            switch (arg) {
                case 'EOL':
                    osService.printEOL(); break;
                case 'cpus':
                    osService.printCpus(); break;
                case 'homedir':
                    osService.printHomeDir(); break;
                case 'username':
                    osService.printUserName(); break;
                case 'architecture':
                    osService.printArchitecture(); break;
            }
        }
    },
];

module.exports = osCommands;