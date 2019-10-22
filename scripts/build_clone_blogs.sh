CUR_DIR="$(cd $(dirname $0) && pwd)"
pushd "$CUR_DIR/../src/main/content"

# Allow user to pass in git url and branch, for example ./build_clone_blogs git@github.ibm.com:ICP4APPs/blogs.git master
BLOGS_GIT_URL=${1:-"https://github.com/kabanero-io/blogs"}
BLOGS_GIT_REVISION=${2:-"master"}

# For development purposes, lets always delete previously created folders
# so that you can run this script to refresh your blog files
rm -rf _posts _drafts img/blog

echo "Start cloning blogs repository..."
# clones into a blog_temp folder to prevent file name collisions when cloned
git clone "$BLOGS_GIT_URL" --branch "$BLOGS_GIT_REVISION" blogs_temp

mkdir _drafts && mv blogs_temp/drafts/* _drafts

mkdir _posts && mv blogs_temp/publish/* _posts

# Add images from blog repo to the img folder
mkdir img/blog && mv blogs_temp/img/* img/blog

rm -rf blogs_temp
popd
echo "Done handling blogs repository!"