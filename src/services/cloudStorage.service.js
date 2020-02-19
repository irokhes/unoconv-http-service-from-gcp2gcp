

const { Storage } = require('@google-cloud/storage');
const { google } = require('../config/vars');

const storage = new Storage({
    projectId: google.projectId,
    keyFilename: google.filekey,
});
const uuid = require('uuid/v4');

//-
// Generate a URL that allows temporary access to download your file.
//-
const uploadFileFromBuffer = (bufferFile) => {
    return new Promise((resolve, reject) => {
        const bucket = storage.bucket(google.bucket);
        const filename = `${uuid()}.pdf`;
        const file = bucket.file(filename);

        file.createWriteStream({
            metadata: {
                contentType: 'application/pdf',
            },
        }).on('error', (err) => {
            reject(err);
        }).on('finish', () => {
            console.log('TODO OK JOSE LUIS');
            resolve(`https://storage.googleapis.com/${google.bucket}/${filename}`);
        }).end(bufferFile);
    });
}
module.exports = {
    uploadFileFromBuffer
};

