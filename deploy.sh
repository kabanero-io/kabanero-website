#!/bin/bash

# verify that the required Cloud Foundry variables are set
invocation_error=0

# - BXIAM: IBM Cloud API key
if [ -z ${BXIAM+x} ]; then echo 'Error: Environment variable BXIAM is undefined.'; invocation_error=1; fi
# - CF_ORGANIZATION: IBM Cloud/Cloud Foundry organization name
if [ -z ${CF_ORGANIZATION+x} ]; then echo 'Error: Environment variable CF_ORGANIZATION is undefined.'; invocation_error=1; fi
# - CF_SPACE: IBM Cloud/Cloud Foundry space name
if [ -z ${CF_SPACE+x} ]; then echo 'Error: Environment variable CF_SPACE is undefined.'; invocation_error=1; fi

# set optional Cloud Foundry variables if they are not set
# - CF_API: IBM Cloud API endpoint (default to US-South region)
if [ -z ${CF_API+x} ]; then export CF_API='https://api.ng.bluemix.net'; fi

if [ ${invocation_error} -eq 1 ]; then echo 'Something went wrong, check for previous errors.'; exit 1; fi

# login and set target
./Bluemix_CLI/bin/bluemix config --check-version false
./Bluemix_CLI/bin/bluemix api $CF_API
./Bluemix_CLI/bin/bluemix login --apikey $BXIAM
./Bluemix_CLI/bin/bluemix target -o $CF_ORGANIZATION -s $CF_SPACE

./Bluemix_CLI/bin/bluemix cf push