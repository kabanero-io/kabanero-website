#!/bin/bash
if [ "$TRAVIS_REPO_SLUG" != "kidus60/kabanero-website" ];then
        echo "Only builds from kabanero-io/kabanero-website repository is allowed.";  
        exit 0;
    fi