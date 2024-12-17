class PathService {
    constructor() {
        this._path = require('path');
        this._fs = require('fs/promises');
        this._currentPath = process.cwd();
    }

    get currentPath() {
        return this._currentPath;
    }

    resolve(...path){
        return this._path.resolve(this.currentPath, ...path);
    }

    getFileName(filePath){
        return this._path.basename(filePath);
    }

    async changeDirectoryAsync(path) {
        const dedicatedFolder = this.resolve(path);

        try {
            await this._fs.access(dedicatedFolder)
            this._currentPath = dedicatedFolder;
        } catch(e) {
            console.error(`Cannot find path '${dedicatedFolder}' because it does not exist.`);
            throw e;
        }
    }

    async upAsync(){
        await this.changeDirectoryAsync('../');
    }

    async listFilesAsync(){
        const files = await this._fs.readdir(this.currentPath, { withFileTypes: true });
        const result = files.map(file => ({
            'Filename': file.name,
            'Type' : file.isDirectory() ? 'Directory' : 'File',
            isDirectory: file.isDirectory()
        })).sort((a, b) => {
                if(a.isDirectory === b.isDirectory) {
                    return a['Filename'].localeCompare(b['Filename']);
                }
                return a.isDirectory ? -1 : 1;
            });

        console.table(result, ['Filename', 'Type']);
    }
}

module.exports = new PathService();