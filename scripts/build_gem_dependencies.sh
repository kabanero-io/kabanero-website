echo "Installing bundler and ruby packages..."
# Install bundler 2.0.2 because 2.1.x is breaking the build
gem install bundler -v "2.0.2"
bundle install
