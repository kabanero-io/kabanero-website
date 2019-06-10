#!/bin/bash
set -e

APP_NAME=$1

echo "============== Logging into IBM Cloud's Cloud Foundry via ibmcloud CLI =============="

ibmcloud login -a "$IBM_CLOUD_API" -s "$IBM_CLOUD_SPACE" -o "$IBM_CLOUD_ORGANIZATION" -r us-south --apikey "$IBM_CLOUD_API_KEY"

echo "App name is $APP_NAME"

ibmcloud cf push $APP_NAME