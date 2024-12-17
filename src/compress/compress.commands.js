const compressService = require('./compress.service');

const compressCommands = [
    {
        name: 'compress',
        requiredParams: 2,
        commandDescription: 'Compress a file. Syntax: compress <path_to_file> <path_to_destination>',
        handler: (name, params, args) => {
            const [srcPath, destPath] = params;
            return compressService.compressFileAsync(srcPath, destPath);
        }
    },
    {
        name: 'decompress',
        requiredParams: 2,
        commandDescription: 'Decompress a file. Syntax: decompress <path_to_file> <path_to_destination>',
        handler: (name, params, args) => {
            const [srcPath, destPath] = params;
            return compressService.decompressFileAsync(srcPath, destPath);
        }
    }
]

module.exports = compressCommands;