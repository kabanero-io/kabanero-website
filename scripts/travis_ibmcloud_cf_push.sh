
SCRIPT_DIR=$(dirname $0)

curl -fsSL https://clis.cloud.ibm.com/install/linux | sh
source $SCRIPT_DIR/build_clone_blogs.sh   $BLOGS_GIT_URL  $BLOGS_GIT_REVISION
source $SCRIPT_DIR/build_clone_docs.sh    $DOCS_GIT_URL   $DOCS_GIT_REVISION
source $SCRIPT_DIR/build.sh

if [ "$JEKYLL_ENV" == "production" ]; then
    source $SCRIPT_DIR/bmcloud-cf-push.sh kabanero-prod
else

    source $SCRIPT_DIR/bmcloud-cf-push.sh "${TRAVIS_REPO_SLUG%/*}"-kabanero
fi