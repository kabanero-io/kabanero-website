FROM ruby:latest

# INSTALL NODEJS AND NPM (it's a dependency of something in the Jekyll setup)

# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# update the repository sources list
# and install dependencies
RUN apt-get update \
    && apt-get install -y curl \
    && apt-get -y autoclean

# nvm environment variables
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 9.0.0

# install nvm
# https://github.com/creationix/nvm#install-script
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

# install node and npm
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# confirm installation
RUN node -v
RUN npm -v

# INSTALLING AND RUNNING JEKYLL

# create a user and group for Jekyll, set appropriate permissions, install the Jekyll gem
RUN mkdir -p /home/jekyll \
    && groupadd -rg 1000 jekyll \
    && useradd -rg jekyll -u 1000 -d /home/jekyll jekyll \
    && chown jekyll:jekyll /home/jekyll

# Create a mount point where Docker can access the source files on my local system (host system)
VOLUME /home/jekyll

#  Set the working directory
WORKDIR /home/jekyll

# kabanero.io gem dependencies
COPY ./scripts /home/jekyll/scripts
COPY Gemfile /home/jekyll
COPY Gemfile.lock /home/jekyll

# kabanero.io custom gems
COPY ./gems /home/jekyll/gems
RUN pushd gems/ol-asciidoc \
    && gem build ol-asciidoc.gemspec \
    && gem install ol-asciidoc-0.0.1.gem \
    && popd

RUN scripts/build_gem_dependencies.sh

RUN npm install eslint --save-dev