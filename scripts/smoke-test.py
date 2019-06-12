#!/usr/bin/env python3

# Smoke test for ibmcloud-cf-push.sh blue green deploy.
# The CF blue-green-deploy plugin passes in the FQDN of the new idle app to this script before it attaches the live route to it.
# If this script exits with a non-zero code, the new idle app will not go live and the currently running app will stay live
import sys
import requests 

url = "https://" + sys.argv[1] + "/api/health"
r = requests.get(url = url)

status_code = r.status_code
json = r.json()

json_status = json['status']

if status_code == 200 and json_status == "ok":
    print("smoke test passed")
    exit(0)
else:
    print(f"Response for {url} was: {status_code} {json}")
    exit(1)