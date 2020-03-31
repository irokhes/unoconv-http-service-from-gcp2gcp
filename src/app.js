const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { port } = require('./config/vars');
const service = require('./services/convert.service');
const cloudService = require('./services/cloudStorage.service');
const app = express();
app.use(bodyParser.json());

const callWebhook = async (body, url, options) => {
  const b = body;
  if(options) b.options = options;
  await axios.post(url, b).catch((error) => console.log(error));
}

app.post('/', async (req, res) => {
  try {
    const { filename, webhookURL, options } = req.body;

    const fileInfo = cloudService.getFileInfo();

    if (webhookURL) res.send({url:fileInfo.url}).status(202);
    const fileBuffer = await service.convertFile(filename);
    const result = await cloudService.uploadFileFromBuffer(fileInfo.filename, fileBuffer);
    console.log('Result from the cloud: ', result);
    webhookURL ? callWebhook({status: 'completed'}, webhookURL, options) : res.send(result);

  } catch (error) {
    console.log(error);
    if (webhookURL) callWebhook({status: 'error', error}, webhookURL, options);
  }
});

app.get('/status', (req, res) => res.send('OK'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));