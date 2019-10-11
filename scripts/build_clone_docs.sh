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
    TAGS=$(git ls-remote --tags $1 | cut -d/ -f3-)
    #get the latest tag from repo
    LATEST_TAG=$(git ls-remote --tags $DOCS_GIT_URL | awk -F'/' '/[0-9].[0-9].[0-9].*/ { print $3}' | sort -nr | head -n1)
    
    for TAG in $TAGS; do
    #Remove the letter v or any other letter before the version number so VERSION only contains the numaric value of a release
    VERSION=$(sed 's/[A-Za-z]*//g' <<<$TAG)

    # If its the latest version of docs we want to clone it into the root of /docs
    # for all other tags we clone them into a folder of thier own with the folder name being the version of doc under the /docs dir 
        if [ "$TAG" == "$LATEST_TAG" ]; then
            git clone -b $TAG --single-branch $DOCS_GIT_URL .

            #Create an adoc file in the root of the docs folder and add the list of tagged version for later use
            echo ":page-title: docs version list" >> docs-version-list.adoc 
            echo -n ":page-versions: [ " >> docs-version-list.adoc 
        else
            #Clone all the tagged releases and place them in a folder that contains their version number
            git clone -b $TAG --single-branch $DOCS_GIT_URL $VERSION
        fi
        echo -n "'$VERSION'," >> docs-version-list.adoc 
    done
        echo -n "]" >> docs-version-list.adoc 
}
pushd "$CUR_DIR/../src/main/content"

# Remove the folder to allow this repeating execution of this script
rm -rf docs

echo "Start cloning docs repository: ${DOCS_GIT_URL} with revision: ${DOCS_GIT_REVISION}"
mkdir docs && cd docs

# This is how you clone a repo without autocreating a parent folder with the name of the repo
# The clone is picky about cloning into a folder that is not empty (src/main/content)
if [ "$JEKYLL_ENV" == "production" ]; then
    git clone "${DOCS_GIT_URL}" --branch "${DOCS_GIT_REVISION}" .

    echo ":page-title: docs version list" >> docs-version-list.adoc 
    echo -n ":page-versions: ['0.0.0'] " >> docs-version-list.adoc 
else
    git_clone_doc_tags "${DOCS_GIT_URL}" "${DOCS_GIT_REVISION}"
fi

popd
echo "Done cloning docs repository"
