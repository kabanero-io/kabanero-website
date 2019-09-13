# Use the official Ruby image as a parent image
FROM ruby:latest

# update the repository sources list
# and install dependencies
RUN apt-get update \
    && apt-get install -y curl 

ENV NODE_VERSION=12.6.0
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

RUN npm install eslint --save-dev

RUN mkdir -p src/main/content/_assets/js

RUN node --version
RUN npm --version
