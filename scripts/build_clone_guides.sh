# Clone the guides (draft or published)
GUIDES_GIT_URL=${1:-"https://github.com/kabanero-io/guides.git"}
GUIDES_GIT_REVISION=${2:-"master"}
# A file with a guide name on every newline that is expected to not be a part of this build
SKIP_GUIDES_FILE=$3

SKIP_GUIDES=""
if [ -f "$SKIP_GUIDES_FILE" ]; then
    SKIP_GUIDES=$(< $3)
fi

CUR_DIR="$(cd $(dirname $0) && pwd)"

pushd "$CUR_DIR/../src/main/content"

# Remove the folder to allow this repeating execution of this script
rm -rf guides

echo "Start cloning guides repository: ${GUIDES_GIT_URL} with revision: ${GUIDES_GIT_REVISION}"
mkdir guides-tmp guides && cd guides-tmp

# This is how you clone a repo without autocreating a parent folder with the name of the repo
# The clone is picky about cloning into a folder that is not empty (src/main/content)
git clone "${GUIDES_GIT_URL}" --branch "${GUIDES_GIT_REVISION}" .
mv publish/* ../guides

if [ "$JEKYLL_DRAFT_GUIDES" == "true" ]; then
    mv draft/* ../guides
fi

rm -rf ../guides-tmp

# Remove guides we want skipped from guides dir
for guide in ${SKIP_GUIDES[@]}; do
  rm -rf ../guides/"${guide}";
done

popd
echo "Done cloning guides repository"


