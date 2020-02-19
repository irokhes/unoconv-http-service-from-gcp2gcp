const unoconv = require("unoconv-promise");
const { google } = require('../config/vars');

const convertFile = (filename) => unoconv.convert(`https://storage.googleapis.com/${google.bucket}/${filename}`);

module.exports = {
    convertFile
}