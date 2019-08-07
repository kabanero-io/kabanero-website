# Clone the docs (draft or published)
#
# git clone does not like to clone into folders that are populated.  We are doing
# this sequence of commands to workaround that limitation. 
# Could _not_ use:
#   git clone git@github.com:kabanero-io/docs.git --branch develop src/main/content

# Remove the folder to allow this repeating execution of this script
pwd
rm src/main/content/_includes/CONTRIBUTING.md
cp CONTRIBUTING.md src/main/content/_includes/CONTRIBUTING.md
