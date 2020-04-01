const unoconv = require("unoconv-promise");
const { google } = require('../config/vars');
const cloudService = require('./cloudStorage.service');

const convertFile = (filename) => unoconv.convert(`https://storage.googleapis.com/${google.bucket}/${filename}`);

module.exports = {
    convertFile
}

module.exports = (agenda) => {
    agenda.define('convert', { concurrency: 1 }, async job => {
        try {
            console.log('convert service received ', job.attrs.data)
            const fileBuffer = await unoconv.convert(`https://storage.googleapis.com/${google.bucket}/${job.attrs.data.filename}`);
            const result = await cloudService.uploadFileFromBuffer(job.attrs.data.filename, fileBuffer);
            agenda.now('result', Object.assign(job.attrs.data, {result}));

        } catch (error) {
            console.log('error ', error);
        }
    });

}