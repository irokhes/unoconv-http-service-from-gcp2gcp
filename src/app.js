const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { port } = require('./config/vars');
const service = require('./services/convert.service');
const cloudService = require('./services/cloudStorage.service');
const app = express();
app.use(bodyParser.json());

const callWebhook = async (body, url) => {
  await axios.post(url, body).catch((error) => console.log(error));
}

app.post('/', async (req, res) => {
  try {
    const { filename, webhookURL } = req.body;

    if (webhookURL) res.send().status(202);

    const fileBuffer = await service.convertFile(filename);
    const result = await cloudService.uploadFileFromBuffer(fileBuffer);
    webhook ? callWebhook(result, url) : res.send(result);

  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));