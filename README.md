# unoconv-http-service

Converts documents from GCP storage using unoconv library as a service.

Based on [telemark/docker-node-unoconv](https://hub.docker.com/r/telemark/docker-node-unoconv/) docker image.

## Docker usage

Get your credentials from Google Cloud Console (make sure you have permission to manipulate the Storage)

Create a `.env` file similar to this:

```
PORT=3000
CLOUD_STORAGE_BUCKET=[bucket_name]
GOOGLE_APPLICATION_CREDENTIALS=[name_of_the_file_with_the_google_access_credentials].json
GCP_PROJECT_ID=[your_GCP_project_name]
```

`docker build -t [your tag name] .`

`docker run -d [your tag name from previous step]` The service will listen on the port 3000, you can change that using the `-p` (`-p 80:3000`) parameter on the `run` command or change it in the `.env` file.

## Development usage

If you want to make changes in the service you can mount you code into the container so any change you make it will trigger a reload of the code (using nodemon).

`docker run -d -p 80:3000 -v ${PWD}:/app [your tag name from previous step]`

## Kubernetes