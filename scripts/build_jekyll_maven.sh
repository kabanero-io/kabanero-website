#!/bin/bash
# Exit immediately if a simple command exits with a non-zero status.
set -e
JEKYLL_BUILD_FLAGS=""
CONTENT_DIR="src/main/content"
TARGET_DIR="target"

echo "Ruby version:"
ruby -v

./scripts/build_gem_dependencies.sh

# Guides that are ready to be published to the Code Conjuring site
echo "Cloning repositories with name starting with guide or iguide..."
ruby ./scripts/build_clone_guides.rb

# Development environment only actions
if [ "$JEKYLL_ENV" != "production" ]; then 
    echo "Not in production environment..."
    echo "Adding robots.txt"
    cp robots.txt "$CONTENT_DIR"/robots.txt

    # Development environments with draft docs/guides
    if [ "$JEKYLL_DRAFT_GUIDES" == "true" ]; then
        echo "Clone draft guides for test environments..."
        ruby ./scripts/build_clone_guides.rb "draft-guide"    

        #./scripts/build_clone_docs.sh "draft" # Argument is branch name of kabanero-io/docs
    else
        echo "not cloning draft guides"
    fi
fi

./scripts/build_clone_docs.sh "master" # Argument is branch name of kabanero-io/docs

# Development environments that enable the draft blogs in the _draft directory.
if [ "$JEKYLL_DRAFT_BLOGS" == "true" ]; then
    # Include draft blog posts for non production environments
    JEKYLL_BUILD_FLAGS="--drafts"
fi

echo "Copying guide images to /img/guide"
mkdir -p "$CONTENT_DIR"/img/guide
# Check if any published guide images exist first
for GUIDE in $( ls "$CONTENT_DIR"/guides ); do
	if [[ -d "$CONTENT_DIR/guides/$GUIDE"/assets ]]; then
		cp "$CONTENT_DIR/guides/$GUIDE"/assets/* "$CONTENT_DIR"/img/guide/
	fi
done

# Build draft and published blogs
./scripts/build_clone_blogs.sh

# Jekyll build
echo "Building with jekyll..."
echo `jekyll -version`
mkdir -p "$TARGET_DIR"/jekyll-webapp
bundle exec jekyll build $JEKYLL_BUILD_FLAGS --source "$CONTENT_DIR" --destination "$TARGET_DIR"/jekyll-webapp

# Maven packaging
echo "Running maven (mvn)..."
mvn -B package