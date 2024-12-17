const Application = require('./src/application');
const pathCommands = require('./src/path/path.commands');
const fileCommands = require('./src/file/file.commands');
const osCommands = require('./src/os/os.commands');
const hashCommands = require('./src/hash/hash.commands');
const compressCommands = require('./src/compress/compress.commands');

const app = new Application();

app.addCommands([
    {
        name: '.exit',
        commandDescription: 'Exit the application',
        handler: () => { app.exit(); }
    },
    {
        name: '.help',
        commandDescription: 'Print help',
        handler: () => { app.printHelp(); }
    },
    ])
    .addCommands(pathCommands)
    .addCommands(fileCommands)
    .addCommands(osCommands)
    .addCommands(hashCommands)
    .addCommands(compressCommands);

app.listenConsole();