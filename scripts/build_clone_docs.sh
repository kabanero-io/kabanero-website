# Clone the docs (draft or published)
#
# git clone does not like to clone into folders that are populated.  We are doing
# this sequence of commands to workaround that limitation. 
# Could _not_ use:
#   git clone git@github.com:kabanero-io/docs.git --branch develop src/main/content
DOCS_GIT_URL=${1:-"https://github.com/kabanero-io/docs"}
DOCS_GIT_REVISION=${2:-"master"}

CUR_DIR="$(cd $(dirname $0) && pwd)"
pushd "$CUR_DIR/../src/main/content"

# Remove the folder to allow this repeating execution of this script
rm -rf docs

echo "Start cloning docs repository: ${DOCS_GIT_URL} with revision: ${DOCS_GIT_REVISION}"
mkdir docs
cd docs

# This is how you clone a repo without autocreating a parent folder with the name of the repo
# The clone is picky about cloning into a folder that is not empty (src/main/content)
git clone "${DOCS_GIT_URL}" --branch "${DOCS_GIT_REVISION}" .

popd
echo "Done cloning docs repository"