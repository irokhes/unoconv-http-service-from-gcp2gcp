const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { port } = require('./config/vars');
const cloudService = require('./services/cloudStorage.service');
const app = express();
app.use(bodyParser.json());

const agenda = require('./config/agenda');

const callWebhook = async (body, url, options) => {
  const b = body;
  if(options) b.options = options;
  await axios.post(url, b).catch((error) => console.log(error));
}

(async function() { // IIFE to give access to async/await
  await agenda.start();
  console.log('agenda started');
  require('./services/convert.service')(agenda);
})();

agenda.define('result', async job => {
  try {
    console.log('eeeee I got a result back ', job.attrs.data);
    callWebhook({status: 'completed'}, job.attrs.data.webhookURL, job.attrs.data.options);
  } catch (error) {
    console.log(error);
  }
});

app.post('/', async (req, res) => {
  const { filename, webhookURL, options } = req.body;
  console.log(req.body);
  try {
    console.log('new incoming convert request')

    const fileInfo = cloudService.getFileInfo();
    console.log('this is the file info');
    if (webhookURL) res.send({url:fileInfo.url}).status(202);
    console.log('after webhookURL');
    agenda.now('convert', {filename, webhookURL, options});
  } catch (error) {
    console.log(error);
    if (webhookURL) callWebhook({status: 'error', error}, webhookURL, options);
  }
});

app.get('/status', (req, res) => res.send('OK'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));