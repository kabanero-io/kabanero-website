#!/bin/bash

PAT_ENV=""
if [ -n "$PAT" ]; then
   PAT_ENV="-e $PAT"
fi

docker run -it \
        -e IBM_CLOUD_ORGANIZATION=${IBM_CLOUD_ORGANIZATION} \
          -e IBM_CLOUD_SPACE=${IBM_CLOUD_SPACE} \
          -e IBM_CLOUD_API_KEY=${IBM_CLOUD_API_KEY} \
          -e IBM_CLOUD_API=${IBM_CLOUD_API} \
          -e DOCS_GIT_URL=${DOCS_GIT_URL} \
          -e DOCS_GIT_REVISION=${DOCS_GIT_REVISION} \
          -e BLOGS_GIT_REVISION=${BLOGS_GIT_REVISION} \
          -e BLOGS_GIT_URL=${BLOGS_GIT_URL} \
          -e GUIDES_GIT_URL=${GUIDES_GIT_URL} \
          -e GUIDES_GIT_REVISION=${GUIDES_GIT_REVISION} \
          -e JEKYLL_DRAFT_GUIDES=${JEKYLL_DRAFT_GUIDES} \
          -e JEKYLL_ENV=${JEKYLL_ENV} \
          -e TRAVIS_REPO_SLUG=${TRAVIS_REPO_SLUG%/*} \
          -e TRAVIS_EVENT_TYPE=${TRAVIS_EVENT_TYPE} \
          ${PAT_ENV} \
          website-travis bash -c "$1"  
