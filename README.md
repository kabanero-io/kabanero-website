![](src/main/content/img/Kabanero_Logo_Hero.png)

# Introduction
Kabanero.io is a portable, mobile enabled web application hosted on [IBM Cloud](https://cloud.ibm.com). It features [Jekyll](https://jekyllrb.com/) based templates with [Asciidoctor](http://asciidoctor.org/) support. New content, such as blog posts and guides, can be easily added in HTML, markdown or AsciiDoc format.

## Portability
The graphical user interface is built to work consistently across all major web browsers, including Chrome, Edge, Internet Explorer, Firefox and Safari.

## Responsive design
The [jQuery](https://jquery.com/) and [Bootstrap](http://getbootstrap.com/) frameworks are leveraged to provide a seamless experience in desktops, laptops, tablets, and smart phones.

## Contributing to the website
Please [view our contribution guidelines](https://github.com/kabanero-io/kabanero-website/blob/master/CONTRIBUTING.md) for the Kabanero.io website.

## Contributing to the blog
Please see [Contributing to the blog](https://github.com/kabanero-io/blogs) in our Blogs repository.

## Contributing to the guides
Each guide resides in its own repository and is dynamically pulled into kabanero.io via the build process. The content of the guide can be written in HTML, markdown, or AsciiDoc formats- AsciiDoc is preferred. The following front matter variables must be set:
```
---
permalink: /guides/nameofguide/
github-url: URL of the guide repository in github for example: https://github.com/kabanero-io/guide-overview
---
- layout: guide
- duration: `time required to complete the guide`
- description: `one line description of the guide`
- tags: `(optional) array of tags associated with the guide`
```
`layout` could also be `guide-multipane` which renders that code column to show code on the side.

To get started open an issue to get a repository in the kabanero-io github org created for your guide. Make sure `draft-guide-` is appended to the beginning of the repo name. `draft-` ensures it will not get published to the site. `guide-` ensures our build process will pull in the guide during build.

### Images for Guides

If you want to add images to your guide you can put them in your guide repository.

* Image Location
   * Create a dir in your guide repositoy called `assets` and put them in there. 
      * These images get copied over to the sites `/img/guides/` dir during build. 

* Image Naming
   * You should include the name of your guide in the name your image to prevent image naming conflicts from other guide repositories.
   
* Image Reference
   * You can reference the image in your AsciiDoc file like the following example:
      * `image::/img/guide/name_of_your_image.png[link="/img/guide/name_of_your_image.png" alt="Your image alt text"]`

### Render Guides locally

While writing your guide you may want to see your updates live and rendered on the site as you develop it. You can follow [render a guide locally](CONTRIBUTING.md#render-a-guide-locally) to render your guide in a local dev environment.

## Community
- [Kabanero on Twitter](https://twitter.com/Kabaneroio)
- [kabanero tag on stackoverflow](https://stackoverflow.com/questions/tagged/kabanero)
- [Kabanero on Slack](https://ibm-cloud-tech.slack.com/messages/kabanero)
   - [Slack channel request](https://slack-invite-ibm-cloud-tech.mybluemix.net)
