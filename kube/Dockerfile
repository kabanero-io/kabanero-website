FROM ruby:latest as builder

# Install Java
RUN curl -L -o /tmp/jdk.tar.gz https://github.com/AdoptOpenJDK/openjdk8-binaries/releases/download/jdk8u222-b10/OpenJDK8U-jdk_x64_linux_hotspot_8u222b10.tar.gz \
    && tar -xzf /tmp/jdk.tar.gz \
    && mv jdk* /opt \
    && rm /tmp/jdk.tar.gz

# Install Node
ENV NODE_VERSION 10.15.3
RUN curl -fsSLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
    && tar -xf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /opt/ \
    && rm "node-v$NODE_VERSION-linux-x64.tar.xz"

# Install Apache Maven
ENV MAVEN_VERSION 3.6.2
RUN curl -o /tmp/maven.tar.gz https://archive.apache.org/dist/maven/maven-3/${MAVEN_VERSION}/binaries/apache-maven-${MAVEN_VERSION}-bin.tar.gz \
    && tar -xzf /tmp/maven.tar.gz \
    && mv apache-maven-${MAVEN_VERSION} /opt/ \
    && rm /tmp/maven.tar.gz

ENV PATH=/opt/jdk8u222-b10/bin:/opt/node-v$NODE_VERSION-linux-x64/bin/:/opt/apache-maven-${MAVEN_VERSION}/bin:$PATH

COPY ./scripts/build_gem_dependencies.sh /app/scripts/build_gem_dependencies.sh
COPY Gemfile* /app/
COPY gems /app/gems

WORKDIR /app

RUN bash ./scripts/build_gem_dependencies.sh

COPY . /app

RUN bash ./scripts/build_jekyll_maven.sh



FROM openliberty/open-liberty:javaee8-ubi-min

USER root
# Symlink servers directory for easier mounts.
RUN ln -s /opt/ol/wlp/usr/servers /servers
USER 1001

COPY --from=builder /app/target/liberty/wlp/usr/servers /servers
COPY LICENSE /licenses

# Run the server script and start the defaultServer by default.
ENTRYPOINT ["/opt/ol/wlp/bin/server", "run"]
CMD ["defaultServer"]
