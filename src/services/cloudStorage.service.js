

const { Storage } = require('@google-cloud/storage');
const { google } = require('../config/vars');

const storage = new Storage({
    projectId: google.projectId,
    keyFilename: google.filekey,
});
const uuid = require('uuid/v4');

const getFileInfo = ()  =>{
    const filename = `${uuid()}.pdf`;
    return {url:`https://storage.googleapis.com/${google.bucket}/${filename}`, filename}
}

//-
// Generate a URL that allows temporary access to download your file.
//-
const uploadFileFromBuffer = (filename, bufferFile) => {
    return new Promise((resolve, reject) => {
        const bucket = storage.bucket(google.bucket);
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
    uploadFileFromBuffer,
    getFileInfo
};

