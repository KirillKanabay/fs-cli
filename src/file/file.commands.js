const fileService = require('./file.service');

const fileCommands = [
    {
        name: 'cat',
        requiredParams: 1,
        commandDescription: 'Read the file and print it\'s content in the console. Syntax: cat <path_to_file>',
        handler: (name, params, args) => {
            const [fileName] = params;
            return fileService.readFileAsync(fileName);
        }
    },
    {
        name: 'add',
        requiredParams: 1,
        commandDescription: 'Create a new file in the current working directory. Syntax: add <new_file_name>',
        handler: (name, params, args) => {
            const [fileName] = params;
            return fileService.createFileAsync(fileName);
        }
    },
    {
        name: 'rm',
        requiredParams: 1,
        commandDescription: 'Delete the file. Syntax: rm <path_to_file>',
        handler: (name, params, args) => {
            const [fileName] = params;
            return fileService.removeFileAsync(fileName);
        }
    },
    {
        name: 'rn',
        requiredParams: 2,
        commandDescription: 'Rename the file. Syntax: rn <path_to_file> <new_file_name>',
        handler: (name, params, args) => {
            const [oldFileName, newFileName] = params;
            return fileService.renameFileAsync(oldFileName, newFileName);
        }
    },
    {
        name: 'cp',
        requiredParams: 2,
        commandDescription: 'Copy the file. Syntax: cp <path_to_file> <path_to_new_directory>',
        handler: (name, params, args) => {
            const [srcFileName, destPath] = params;
            return fileService.copyFileAsync(srcFileName, destPath);
        }
    },
    {
        name: 'mv',
        requiredParams: 2,
        commandDescription: 'Move the file. Syntax: mv <path_to_file> <path_to_new_directory>',
        handler: (name, params, args) => {
            const [srcFileName, destPath] = params;
            return fileService.moveFileAsync(srcFileName, destPath);
        }
    }
]

module.exports = fileCommands;