CUR_DIR="$(cd $(dirname $0) && pwd)"

pushd "$CUR_DIR/../src/main/content/docs/"

DOC_FOLDER=$(ls)
for FOLDER in $(ls); do
    if [ -d "$FOLDER" ]; then

        for SUB_FOLDER in $FOLDER; do
            if test -f "$SUB_FOLDER/index.adoc"; then
                exit
            else
                pushd $SUB_FOLDER
                    rm -rf concept && rm -rf ref/commands && rm -rf ref/config && rm -rf ref/feature && rm -rf ref/javadocs && rm -rf ref/scripts 
                    rm -r ref/general/docs-welcome.adoc
cat << EOF > index.adoc 
:page-layout: general-reference
:page-title: Welcome to Docs
:sectanchors:

= Welcome to the Kabanero Docs

== Kabanero

Kabanero is an open source project that brings together foundational open source technologies into a modern microservices-based framework. Kabanero provides an end-to-end solution that enables you to architect, build, deploy, and manage the lifecycle of Kubernetes-based applications with more speed than ever.

Kabanero brings together architecture, development, and operations through the use of integrated collections and application stacks. Architects and operations can include their company’s standards for aspects like security and build pipelines customized for their developers use.

Check out our getting started documentation on the left hand menu.
EOF
                popd
            fi
        done
    fi
done
