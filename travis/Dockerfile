# Use the official Ruby image as a parent image
FROM ruby:latest

# update the repository sources list
# and install dependencies
RUN apt-get update \
    && apt-get install -y curl \
    && apt-get -y install maven

ENV NODE_VERSION=12.6.0
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

RUN npm install eslint --save-dev

RUN groupadd -rg 1000 user \
    && useradd -rg user -u 1000 -d / user \
    && chown user:user /

COPY . .
COPY ./.eslintrc.yml  src/main/content/_assets/js/
COPY src/main/content/_assets/js src/main/content/_assets/js

RUN mkdir -p /root/.ssh && \
    chmod 0700 /root/.ssh && \


RUN node --version
RUN npm --version
RUN mvn -version
RUN python3 --version