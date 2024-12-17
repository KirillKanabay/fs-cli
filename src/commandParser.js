function parseArgv(argv){
    const userArgs = argv.slice(2);
    const parsedArgsObj = [];

    userArgs.filter(arg => (/^--(\w+)(?:=(.*))?$/).test(arg))
        .forEach(arg => {
            const [key, value] = arg.slice(2).split('=');
            parsedArgsObj[key] = value;
        })

    return parsedArgsObj;
}

function parseCommand(line){
    const parts = line.split(' ').filter(part => part.length > 0);

    if(parts.length === 0) return null;

    const name = parts[0];
    const params = [];
    const args = [];

    parts.slice(1).forEach(part => {
        if(part.startsWith('--')){
            const value = part.slice(2);
            args.push(value);
        }else{
            params.push(part);
        }
    });

    return {name, params, args};
}

module.exports = {
    parseArgv,
    parseCommand
}