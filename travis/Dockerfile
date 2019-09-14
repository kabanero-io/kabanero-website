# Use the official Ruby image as a parent image
FROM ruby:latest


# update the repository sources list
# and install dependencies
RUN apt-get update \
    && apt-get install -y curl \
    && apt-get -y install maven \
    && apt-get -y install python3-pip \
    && apt-get -y install npm

RUN pip3 install requests
RUN npm install eslint --save-dev

COPY . .

RUN mkdir /root/.ssh && chmod 0700 /root/.ssh \
    && ssh-keyscan -t rsa github.com >> /root/.ssh/known_hosts

