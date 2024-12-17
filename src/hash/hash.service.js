class HashService{
    constructor() {
        this._crypto = require('crypto');
        this._fs = require('fs/promises');
        this._pathService = require('../path/path.service');
    }

    async printFileHashAsync(filePath){
        const hash = this._crypto.createHash('sha256');
        const fileHandle = await this._fs.open(this._pathService.resolve(filePath), 'r');

        const readStream = fileHandle.createReadStream();

        try {
            return await new Promise((res, rej) => {
                readStream.on('data', (chunk) => {
                    hash.update(chunk);
                });

                readStream.on('end', () => {
                    console.log(hash.digest('hex'));
                    res();
                });

                readStream.on('error', (err) => {
                    rej(err);
                });
            });
        } finally {
            await fileHandle.close();
        }
    }
}

module.exports = new HashService();