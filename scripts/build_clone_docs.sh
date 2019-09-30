# Clone the docs (draft or published)
#
# git clone does not like to clone into folders that are populated.  We are doing
# this sequence of commands to workaround that limitation.
# Could _not_ use:
#   git clone git@github.com:kabanero-io/docs.git --branch develop src/main/content

CUR_DIR="$(cd $(dirname $0) && pwd)"

git_clone_doc_tags() {
    TAGS=$(git ls-remote --tags $1 | cut -d/ -f3-)

    if [ -z "$TAGS" ]; then
        git clone "$1" --branch "$2" 0.0.0
    else
        for TAG in $TAGS; do
            VERSION=$(sed 's/[A-Za-z]*//g' <<<$TAG)
            git clone -b $TAG --single-branch $1 $VERSION
        done
    fi
}

pushd "$CUR_DIR/../src/main/content"
# Remove the folder to allow this repeating execution of this script
rm -rf docs

echo "Start cloning docs repository..."
mkdir docs && cd docs

# This is how you clone a repo without autocreating a parent folder with the name of the repo
# The clone is picky about cloning into a folder that is not empty (src/main/content)
if [ -n "$1" ] && [ -n "$2" ]; then
    git_clone_doc_tags "$1" "$2"
else
    git_clone_doc_tags https://github.com/kabanero-io/docs.git master
fi

popd
echo "Done cloning docs repository!"

./scripts/modify_docs_folder.sh