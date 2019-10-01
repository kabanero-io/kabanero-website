# Kabanero.io Website Release Process

## Overview
The content on the Kabanero.io Website is built from four different sources:
- UI of the Website from: https://github.com/kabanero-io/kabanero-website
- Docs from: https://github.com/kabanero-io/docs
- Blogs from: https://github.com/kabanero-io/blogs
- The guides from repositories in https://github.com/kabanero-io that begin with `guide-`

## Website Release
The website has its own independent release process.  Releases are versioned using standard semantic versioning of format **MAJOR.MINOR.PATCH**.

When there is enough new content to publish, maintainers will cut a new release. Depending on the scope of the updates in the release, maintainers will decide which version to increment.


## Guides Release
There are no "releases" for the Kabanero.io Guides. As detailed in the [Kabanero.io Guides Contribution Guidelines](https://github.com/kabanero-io/draft-guides-template/blob/master/README.md), the guides will only be picked up by the build if the repository that a guide is in begins with `guide-`.  Said another way, a guide whose repository begins with `guide-` is considered "released". Maintainers will decide what guides are released.


## Blogs Release
Blogs have their own independent release process.  

Increment the **Minor** version when new blogs are added. The build will use the latest release when the website is published. 

## Docs Release
Docs follow the release process for Kabanero as a whole - Kabanero uses [semver](https://semver.org/) versioning.

Here is an example flow of the Kabanero release using `0.2.0` as the next release example:

**Assumption**: When a new release of Kabanero as a whole is ready the next version number will always be a **Major** or **Minor** increment (never a **Patch** increment).

1. When `0.2.0` release date comes maintainers cut the `0.2.0` release on the repo. End of release process.

### Docs repo needs a hot fix for `0.2.0` example

1. If after a release, A piece of Kabanero.io (cli, pipelines, operator, docs, etc...) needs to do a small update or a quick bug fix or something (and should be deployed before the next scheduled release, `0.3.0`, in this example) maintainers would:
1. create a `release-0.2` branch based off the `0.2.0` release. 
1. Put the changes in the `release-0.2` branch and `master` branch, if applicable (see Note below).
1. Cut a new release based off the `release-0.2` branch and increment the patch number so it becomes `0.2.1`
1. Publish release `0.2.1`.

**Note**: During this whole hot fix situation the `master` branch will always be going towards the next release so new stuff in master will always be `0.3.0` related.