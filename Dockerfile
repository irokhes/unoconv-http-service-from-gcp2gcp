FROM telemark/docker-node-unoconv:10.14.0

#### Begin setup ####


RUN mkdir /app
WORKDIR /app
ADD package.json /app/
# Install dependencies
RUN npm install
ADD . /app

# Env variables
ENV SERVER_PORT 3000
ENV PAYLOAD_MAX_SIZE 1048576
ENV PAYLOAD_TIMEOUT 120000
ENV TIMEOUT_SERVER 120000
ENV TIMEOUT_SOCKET 140000

# Expose 3000
EXPOSE 3000

# Startup
ENTRYPOINT /usr/bin/unoconv --listener --server=0.0.0.0 --port=2002 & npm run start