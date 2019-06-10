![](src/main/content/img/Kabanero_Logo_Hero.png)

# Introduction
Kabanero.io is a portable, mobile enabled web application hosted on [IBM Cloud](https://cloud.ibm.com). It features [Jekyll](https://jekyllrb.com/) based templates with [Asciidoctor](http://asciidoctor.org/) support. New content, such as blog posts and guides, can be easily added in HTML, markdown or AsciiDoc format.

## Portability
The graphical user interface is built to work consistently across all major web browsers, including Chrome, Edge, Internet Explorer, Firefox and Safari.

## Responsive design
The [jQuery](https://jquery.com/) and [Bootstrap](http://getbootstrap.com/) frameworks are leveraged to provide a seamless experience in desktops, laptops, tablets, and smart phones.

## Contributing to the blog
Create a pull request with the content of the blog post placed in the `src/main/content/_posts/` folder using the following file naming scheme: `YYYY-MM-DD-post-title.extension`. HTML, markdown, and AsciiDoc formats can be used. The file extension would be .html, .md, or .adoc respectively. In the blog post file the following front matter variables must be set:
- layout: post
- categories: blog
- title: `title of the blog post`
- date: `date in YYYY-MM-DD HH:MM:SS +/-TTTT format`
- author_picture: `secure url to author picture`

## Contributing to the guides
Each guide resides in its own repository and is dynamically pulled into the kabanero.io build process through the `scripts/build.sh` shell script. The content of the guide can be written in HTML, markdown, or AsciiDoc formats. The following front matter variables must be set:
- layout: guide
- duration: `time required to complete the guide`
- description: `one line description of the guide`
- tags: `(optional) array of tags associated with the guide`
- permalink: `relative url where the guide will be published`

## Community
- [Kabanero on Twitter](https://twitter.com/Kabaneroio)
- [kabanero tag on stackoverflow](https://stackoverflow.com/questions/tagged/kabanero)
- [Kabanero on Slack](https://ibm-cloud-tech.slack.com/messages/kabanero)
   - [Slack channel request](https://slack-invite-ibm-cloud-tech.mybluemix.net)