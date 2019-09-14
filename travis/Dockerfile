# Use the official Ruby image as a parent image
FROM ruby:latest

# update the repository sources list
# and install dependencies
RUN apt-get update \
    && apt-get install -y curl \
    && apt-get -y install maven \
    && apt-get -y install python3-pip

RUN pip3 install requests

ENV NODE_VERSION=12.6.0
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

RUN npm install eslint --save-dev

COPY . .

RUN mkdir /root/.ssh && chmod 0700 /root/.ssh \
    && ssh-keyscan -t rsa bitbucket.org >> /root/.ssh/known_hosts \
    && ssh-keyscan -t rsa github.com >> /root/.ssh/known_hosts

#RUN node --version
#RUN npm --version
#RUN mvn -version
#RUN python3 --version    