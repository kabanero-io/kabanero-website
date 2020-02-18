# Clone the docs (draft or published)
#
# git clone does not like to clone into folders that are populated.  We are doing
# this sequence of commands to workaround that limitation.
# Could _not_ use:
#   git clone git@github.com:kabanero-io/docs.git --branch develop src/main/content
DOCS_GIT_URL=${1:-"https://github.com/kabanero-io/docs"}
DOCS_GIT_REVISION=${2:-"master"}

CUR_DIR="$(cd $(dirname $0) && pwd)"

git_clone_doc_tags() {

    #get all the latest Major/Minor pair tags we want to clone from the docs repo
    TAGS_TO_CLONE=$($CUR_DIR/tagScript.js $(git tag -l))

    LATEST_TAG=$(git tag -l --sort=v:refname | tail -1)

    git checkout $LATEST_TAG
    
    # Create docversions.json file that is read by the front end to generate doc version dropdown on /docs
    echo -e -n "{\"latest\":\""$LATEST_TAG"\", \"versions\":[ $TAGS_TO_CLONE ]}"  >> docversions.json

    # Remove quotes from tags now (only needed for the JSON in docversions.json)
    TAGS_TO_CLONE=$(echo $TAGS_TO_CLONE | tr -d '"')
    
    # Loop through comma separated tags outputed from tagScript.js
    for TAG in $(echo $TAGS_TO_CLONE | sed "s/,/ /g"); do
    
        if [ "$TAG" != "$LATEST_TAG" ]; then
            # name dir with Major & Minor only, for example "0.6", so when we update docs it has the latest 0.6.x content, 
            # but the link doesn't change, it will stay /docs/0.6/.....
            WORK_TREE=${TAG:0:3}
            mkdir "${WORK_TREE}" && git --work-tree="${WORK_TREE}" checkout $TAG -- .
            echo "Cloned latest documentation tag: ${TAG} into folder: ${WORK_TREE}"
        fi
        
    done
}

pushd "$CUR_DIR/../src/main/content"

# Remove the folder to allow this repeating execution of this script
rm -rf docs

echo "Start cloning docs repository: ${DOCS_GIT_URL} with revision: ${DOCS_GIT_REVISION}"
mkdir docs && cd docs

# This is how you clone a repo without autocreating a parent folder with the name of the repo
# The clone is picky about cloning into a folder that is not empty (src/main/content)

#If we are not in production we only cloned the specified github url and branch and give it the version number 0.0.0
git clone "${DOCS_GIT_URL}" --branch "${DOCS_GIT_REVISION}" .

if [ "$JEKYLL_ENV" == "production" ]; then
    git_clone_doc_tags
fi

popd
echo "Done cloning docs repository"


