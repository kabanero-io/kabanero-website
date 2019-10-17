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

    #get all tags from the repo
    TAGS=$(git tag -l --sort=-v:refname)
    #get the latest tag from repo
    LATEST_TAG=$(git tag -l --sort=v:refname | tail -1)    

    git checkout $LATEST_TAG
    echo -e -n "{\"latest\":\""$LATEST_TAG"\", \"versions\":["  >> docversions.json

    for TAG in $TAGS; do
    echo -e -n \"$TAG\", >> temp.json

        # for all tags other than the latest we clone them into a folder of thier own with the folder name being the version of doc under the /docs dir
        if [ "$TAG" != "$LATEST_TAG" ]; then
            mkdir $TAG && git --work-tree=$TAG checkout $TAG -- .
        fi
    done

    sed '$ s/,$//g' temp.json >> docversions.json 
    rm -f temp.json

    echo -e -n "]}" >> docversions.json
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


