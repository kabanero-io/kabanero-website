#!/bin/bash
set -e

CUR_DIR="$(cd $(dirname $0) && pwd)"
APP_NAME=$1

echo "============== Logging into IBM Cloud's Cloud Foundry via ibmcloud CLI =============="

ibmcloud login -a "$IBM_CLOUD_API" -s "$IBM_CLOUD_SPACE" -o "$IBM_CLOUD_ORGANIZATION" -r us-south --apikey "$IBM_CLOUD_API_KEY"

echo "app name is: $APP_NAME"

# https://github.com/bluemixgaragelondon/cf-blue-green-deploy
if ibmcloud cf plugins | grep --quiet blue-green-deploy; then
    echo "cf blue-green-deploy plugin is already installed"
else
    ibmcloud cf add-plugin-repo CF-Community https://plugins.cloudfoundry.org
    ibmcloud cf install-plugin -f blue-green-deploy -r CF-Community
fi

ibmcloud cf blue-green-deploy $APP_NAME --delete-old-apps --smoke-test "$CUR_DIR"/smoke-test.py