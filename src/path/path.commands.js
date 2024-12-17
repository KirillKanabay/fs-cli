const pathService = require('./path.service');

const pathCommands = [
    {
        name: 'cd',
        requiredParams: 1,
        commandDescription: 'Go to dedicated folder from the current directory (<path_to_directory> can be relative or absolute). Syntax: cd <path_to_directory>',
        handler: (command, params, args) => {
            const [path] = params;
            return pathService.changeDirectoryAsync(path);
        }
    },
    {
        name: 'up',
        requiredParams: 0,
        commandDescription: 'Go upper from the current directory. Syntax: up',
        handler: (command, params, args) => {
            return pathService.upAsync();
        }
    },
    {
        name: 'ls',
        requiredParams: 0,
        commandDescription: 'List of all files and folders in the current directory. Syntax: ls',
        handler: (command, params, args) => {
            return pathService.listFilesAsync();
        }
    },
];

module.exports = pathCommands;