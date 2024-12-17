const hashService = require('./hash.service');

const hashCommands = [
    {
        name: 'hash',
        requiredParams: 1,
        commandDescription: 'Calculate hash for the file and print in the console. Syntax: hash <path_to_file>',
        handler: (name, params, args) => {
            const [filePath] = params;
            return hashService.printFileHashAsync(filePath);
        }
    }
];

module.exports = hashCommands;