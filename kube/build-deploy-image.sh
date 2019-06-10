# This script will:
# 1. build the docker image that is hosted on IDK
# 2. upload the image to our repository if registry env variables are defined

# Exit immediately if a simple command exits with a non-zero status.
set -e

DOCKER_IMAGE_NAME=kabanero-site
NAMESPACE=kabanero

CUR_DIR="$(cd $(dirname $0) && pwd)"
WORK_DIR="$CUR_DIR"/work

mkdir "$WORK_DIR"
trap "rm -rf $WORK_DIR" EXIT

if [ -z "$DOCKER_IMAGE_TAG" ]; then
    DOCKER_IMAGE_TAG=latest
fi

if [ ! -d "$CUR_DIR"/../target/liberty/wlp/usr/servers ]; then
  echo "The default server directory does not exist in target/liberty/wlp/usr/servers - did you run scripts/build_jekyll_maven.sh ?"
  exit 1
fi

cp -r "$CUR_DIR"/../target/liberty/wlp/usr/servers "$WORK_DIR"

echo "building docker image $DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG"
docker build -t "$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG" "$CUR_DIR"

# publish to a registry
if [ -n "$DOCKER_REGISTRY" ] && [ -n "$DOCKER_REGISTRY_USER" ] && [ -n "$DOCKER_REGISTRY_PASSWORD" ]; then
    docker tag "$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG" "$DOCKER_REGISTRY/$NAMESPACE/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG"
    echo "Connecting to $DOCKER_REGISTRY Docker registry as $DOCKER_REGISTRY_USER"

    docker login "--username=$DOCKER_REGISTRY_USER" "--password=$DOCKER_REGISTRY_PASSWORD" "$DOCKER_REGISTRY"

    echo "Pushing $DOCKER_REGISTRY/$NAMESPACE/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG image to Docker registry"
    docker push "$DOCKER_REGISTRY/$NAMESPACE/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG"
fi