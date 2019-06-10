CUR_DIR="$(cd $(dirname $0) && pwd)"
pushd "$CUR_DIR/../src/main/content"

# Allow user to pass in git url and branch, for example ./build_clone_blogs git@github.ibm.com:ICP4APPs/blogs.git master
# Also allow the option to not pass in git url and branch, this is useful if the content already exists (Jenkins will have cloned the blogs before this step)
if [ -n "$1" ] && [ -n "$2" ]; then
	# For development purposes, lets always delete previously created folders
	# so that you can run this script to refresh your blog files
	rm -rf _posts _drafts
	rm -rf img/blog
	
	echo "Start cloning blogs repository..."
	git clone "$1" --branch "$2" blogs_temp
fi

mv blogs_temp/drafts/ .
mv drafts/ _drafts
mv blogs_temp/publish/ .
mv publish/ _posts

mv blogs_temp/img/blog img

rm -rf blogs_temp
popd
echo "Done handling blogs repository!"