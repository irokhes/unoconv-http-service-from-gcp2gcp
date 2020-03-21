// import .env variables
require('dotenv').config();


module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  google: {
    projectId: process.env.GCP_PROJECT_ID,
    bucket: process.env.CLOUD_STORAGE_BUCKET,
    filekey: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  },
};
