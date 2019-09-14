FROM node:latest
RUN npm install eslint --save-dev

FROM python:latest
RUN pip3 install requests

COPY . .

RUN mkdir /root/.ssh && chmod 0700 /root/.ssh \
    && ssh-keyscan -t rsa github.com >> /root/.ssh/known_hosts
