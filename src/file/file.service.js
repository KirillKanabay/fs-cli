class FileService{
    constructor() {
        this._fs = require('fs/promises');
        this._ps = require('../path/path.service');
    }

    async readFileAsync(file){
        const filePath = this._ps.resolve(file);
        const fileHandle = await this._fs.open(filePath, 'r');

        const stream = fileHandle.createReadStream();
        try {
            return await new Promise((res, rej) => {
                stream.on('data', (chunk) => {
                    console.log(chunk.toString());
                });
                stream.on('end', () => {
                    res();
                });
                stream.on('error', (err) => {
                    rej(err);
                });
            });
        } finally {
            await fileHandle.close();
        }
    }

    async createFileAsync(file){
        const filePath = this._ps.resolve(file);
        return this._fs.writeFile(filePath, '');
    }

    async removeFileAsync(file){
        const filePath = this._ps.resolve(file);
        return this._fs.unlink(filePath);
    }

    async renameFileAsync(oldFileName, newFileName){
        if(oldFileName === newFileName){
            return;
        }

        const oldFilePath = this._ps.resolve(oldFileName);
        const newFilePath = this._ps.resolve(newFileName);

        return this._fs.rename(oldFilePath, newFilePath);
    }

    async copyFileAsync(srcFile, destPath){
        const srcFilePath = this._ps.resolve(srcFile);
        const destFilePath = this._ps.resolve(destPath, this._ps.getFileName(srcFile));

        const srcFileHandle = await this._fs.open(srcFilePath, 'r');
        const destFileHandle = await this._fs.open(destFilePath, 'w');

        const readStream = srcFileHandle.createReadStream();
        const writeStream = destFileHandle.createWriteStream();

        const stream = readStream.pipe(writeStream);

        try {
            return await new Promise((res, reject) => {
                stream.on('finish', () => {
                    res();
                });

                stream.on('error', (err) => {
                    reject(err);
                });
            })
        } finally {
            await srcFileHandle.close();
            await destFileHandle.close();
        }
    }

    async moveFileAsync(srcFile, destPath){
        await this.copyFileAsync(srcFile, destPath);
        await this.removeFileAsync(srcFile);
    }
}

module.exports = new FileService();