# Contributing to Kabanero

Anyone can contribute to the Kabanero project and we welcome your contributions!

There are multiple ways to contribute: report bugs, fix bugs, contribute code, improve upon documentation, etc. You must follow these guidelines:

## Raising issues
Please raise any bug reports on the Kabanero project repository's GitHub issue tracker. Be sure to search the list to see if your issue has already been raised.

A good bug report is one that make it easy for everyone to understand what you were trying to do and what went wrong. Provide as much context as possible so we can try to recreate the issue.

Please open issues in their appropriate repository: 

| Repository | Description |
| --- | --- |
| [Appsody Extension](https://github.com/kabanero-io/appsodyExtension) | This repository is an extension to Codewind that adds support for Appsody projects. |
| [Blogs](https://github.com/kabanero-io/blogs) | [Blogs](https://kabanero.io/blog) for the Kabanero.io site |
| [Codewind Templates](https://github.com/kabanero-io/codewind-templates) | Central repository for storing the list of supported code templates for use in Codewind |
| [Collections](https://github.com/kabanero-io/collections) | Repo contains source of usable Kabanero Collections |
| [Docs](https://github.com/kabanero-io/docs) | Kabanero documentation and example scripts |
| [Kabanero CLI](https://github.com/kabanero-io/kabanero-command-line) | A command line interface that is used to manage the collections the Kabanero environment presents |
| [Kabanero Foundation](https://github.com/kabanero-io/kabanero-foundation) | The Kabanero Foundation Instance is a deployment of a Kabanero collection in a specific Kubernetes cluster. |
| [Kabanero Operator](https://github.com/kabanero-io/kabanero-operator) | The Kabanero Platform Operator installs Kabanero onto a Kubernetes environment. |
| [Kabanero Website](https://github.com/kabanero-io/kabanero-website) | The source code of the website [Kabanero.io](https://kabanero.io/), `YOU ARE HERE` |

## Contributor License Agreement
If you are contributing code changes via a pull request for anything except trivial changes, you must signoff on the [Individual Contributor License Agreement](https://github.com/kabanero-io/kabanero-website/blob/master/cla/kabanero-cla-individual.pdf) If you are doing this as part of your job you may also wish to get your employer to sign a [CCLA Corporate Contributor License Agreement](https://github.com/kabanero-io/kabanero-website/blob/master/cla/kabanero-cla-corporate.pdf). Instructions how to sign and submit these agreements are located at the top of each document. Trivial changes such as Typos, redundant spaces, minor formatting and spelling errors will be labeled as "CLA trivial", and don't require a signed CLA for consideration.

After we obtain the signed CLA, you are welcome to open a pull request, and the team will be notified for review. We ask you follow these steps through the submission process.

Ensure you run a passing local gradle build explained in the README before opening a PR.
Open PR's against the "integration" branch, as we ensure changes pass our series of verification buckets before pushing to master.
A label will be added "CLA signed" or "CLA trivial" depending on the nature of the change.

A team of "reviewers" will be notified, will perform a review, and if approved will invoke a full integration build.

Based on the results of the build, and if further review is needed, more discussion will occur.

If the reviewer is satisfied with the results, and agrees to the change, the PR will be merged to integration, otherwise the PR will be closed with an explanation and suggestion for follow up.

## Coding Standards
Contributing to Kabanero

Please ensure you follow the coding standards used throughout the existing code base. Some basic rules include:

- All files must have an Apache 2.0 Copyright notice in the header. For example, see the top of [src/main/content/_layouts/default.html](https://github.com/kabanero-io/kabanero-website/blob/master/src/main/content/_layouts/default.html).
- All PRs must have a passing build.
- For images, ids, and classes use hypens for spacing (ex. `this-is-a-class`)

# Local Development Setup
This section describes the steps needed to set up your local development environment to contribute changes to the Kabanero.io site.

## Prereqs
- ruby
- gem
- Docker (for optional step)
- mvn (for optional step)

## Clone the repo
- `git clone https://github.com/kabanero-io/kabanero-website.git`
- `cd kabanero-website`

## Install ruby libraries
- From inside the `/kabanero-website` directory, run `bundle install`

## Run server with jekyll script
- From inside the `/kabanero-website` directory, run `./scripts/jekyll_serve_dev.sh` to start your local server.
- Go to http://localhost:4000/

## (Optional) Run site in Docker container
1. Run `./scripts/build_jekyll_maven.sh` which will create a target directory at root with the war and a default server under `target/liberty/wlp/usr/servers`
1. Run `kube/build-deploy-image.sh` this will create the Docker image on your computer
1. Run `docker run -d --rm -p 9443:9443 --name kabanero kabanero-site:latest`
    1. The image name by default is `kabanero-site:latest`, but if you changed the name you will need to replace it with the command above
    1. Go to https://localhost:9443 in your browser and accept the self signed certificate warning to see the site
