class CompressService{
    constructor() {
        this._zlib = require('zlib');
        this._fs = require('fs/promises');
        this._ps = require('../path/path.service');
    }

    async compressFileAsync(srcFile, destPath){
        const srcFilePath = this._ps.resolve(srcFile);
        const destFilePath = this._ps.resolve(destPath, this._ps.getFileName(srcFile)+ '.br');

        const brotli = this._zlib.createBrotliCompress();

        return this._processFileAsync(srcFilePath, destFilePath, brotli);
    }

    async decompressFileAsync(srcFile, destPath){
        const srcFilePath = this._ps.resolve(srcFile);
        if(srcFilePath.endsWith('.br')){
           srcFile = srcFile.slice(0, -3);
        }
        const destFilePath = this._ps.resolve(destPath, this._ps.getFileName(srcFile));

        const brotli = this._zlib.createBrotliDecompress();

        return this._processFileAsync(srcFilePath, destFilePath, brotli);
    }

    async _processFileAsync(srcFilePath, destFilePath, transform){
        const srcFileHandle = await this._fs.open(srcFilePath, 'r');
        const destFileHandle = await this._fs.open(destFilePath, 'w');

        const readStream = srcFileHandle.createReadStream();
        const writeStream = destFileHandle.createWriteStream();

        const stream = readStream.pipe(transform).pipe(writeStream);

        try{
            return await new Promise((res, rej) => {
                stream.on('finish', () => {
                    res();
                });

                stream.on('error', (err) => {
                    rej(err);
                });
            });
        } finally {
            await srcFileHandle.close();
            await destFileHandle.close();
        }
    }
}

module.exports = new CompressService();