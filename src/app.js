const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { port } = require('./config/vars');
const service = require('./services/convert.service');
const cloudService = require('./services/cloudStorage.service');
const app = express();
app.use(bodyParser.json());

const callWebhook = async (fileConvertedUrl, url, options) => {
  const body = { url: fileConvertedUrl }
  if(options) body.options = options;
  await axios.post(url, body).catch((error) => console.log(error));
}

app.post('/', async (req, res) => {
  try {
    const { filename, webhookURL, options } = req.body;

    if (webhookURL) res.send().status(202);

    const fileBuffer = await service.convertFile(filename);
    const result = await cloudService.uploadFileFromBuffer(fileBuffer);
    webhookURL ? callWebhook(result, webhookURL, options) : res.send(result);

  } catch (error) {
    console.log(error);
  }
});

app.get('/status', (req, res) => res.send('OK'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));