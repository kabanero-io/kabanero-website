#!/bin/bash

SCRIPT_DIR=$(dirname $0)

curl -fsSL https://clis.cloud.ibm.com/install/linux | sh
$SCRIPT_DIR/build_clone_blogs.sh   $BLOGS_GIT_URL  $BLOGS_GIT_REVISION
$SCRIPT_DIR/build_clone_docs.sh    $DOCS_GIT_URL   $DOCS_GIT_REVISION
$SCRIPT_DIR/build_jekyll_maven.sh

if [ "$JEKYLL_ENV" == "production" ]; then
    $SCRIPT_DIR/ibmcloud-cf-push.sh kabanero-prod
else
     $SCRIPT_DIR/ibmcloud-cf-push.sh ${TRAVIS_REPO_SLUG%/*}-kabanero
fi