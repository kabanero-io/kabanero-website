$(".toc-item").click(function () {
    $(this).toggleClass('open');
    $(this).find(".plus-minus-icon").attr('src') === '/img/icon_plus.png' ? $(this).find(".plus-minus-icon").attr('src', '/img/icon_minus.png') : $(this).find(".plus-minus-icon").attr('src', '/img/icon_plus.png');
});

$('#doc-search').keyup(function () {
    searchDocs();
});

function searchDocs() {
    let searchTerm = document.getElementById('doc-search').value.toLowerCase();
    let docTitles = $('.doc-title');
    $.each(docTitles, function (index, value) {
        if ($(value).attr('id') !== 'welcome-doc') {
            let docTitle = $(value).text().toLowerCase();
            console.log(docTitle);
            console.log(!$(value).hasClass('active-doc'));
            !docTitle.includes(searchTerm) && !$(value).hasClass('active-doc') ? $(value).hide() : $(value).show();
            console.log(!docTitle.includes(searchTerm) && !$(value).hasClass('active-doc'));
        }
    });
    hideCategoriesIfEmpty();
    $('.toc-item:visible').length === 0 ? $('#noSearchResults').removeClass('no-display') : $('#noSearchResults').addClass('no-display');
}

function hideCategoriesIfEmpty() {
    let categories = $('.toc-item');
    $.each(categories, function (index, category) {
        if ($(category).attr('id') !== 'welcome-doc') {
            let childLinks = $(category).find('.doc-title');
            let isVisible = areLinksVisible(childLinks);
            isVisible ? $(category).show() : $(category).hide();
        }
    });
}

function areLinksVisible(links) {
    let areVisible = false;
    $.each(links, function (index, link) {
        if ($(link).css('display') !== 'none') {
            areVisible = true;
        }
    });
    return areVisible;
}

function selectDocInToc() {
    let currentHref = window.location.href;
    let pathName = '';
    let categoryLocation = 0;
    let selectedFile = "";

    // If the second value in the array is = to 'ref' this means the user is viewing the latest docs (no version # in the path)
    if (location.pathname.split('/')[2] == 'ref') {
        pathName = '/docs'
        categoryLocation = 4;
        selectedFile = `${pathName}/ref/general/${location.pathname.split('/')[categoryLocation]}` + currentHref.substring(currentHref.lastIndexOf('/'));
    }
    // if the second value in the array does not equal 'ref' this means the user has selected to view a different version of the docs
    else {
        pathName = `/docs/${location.pathname.split('/')[2]}`
        categoryLocation = 5;
        selectedFile = `${pathName}/ref/general/${location.pathname.split('/')[categoryLocation]}`;
    }

    /* 
        In order to keep track of the selected doc on the TOC we have to parse out different parts of the url path for the
        the selected doc.
        
        If a user is vewing the latest docs, paths are structured /doc/ref/general/<CATEGORY_NAME>/<DOC_NAME>.adoc
        Otherwise, paths are structured /doc/<VERSION_NUM>/ref/general/<CATEGORY_NAEM>/<DOC_NAME>.adoc
    */
    if (selectedFile !== `${pathName}/ref/general/docs-welcome.html`) {
        $(`a[href$="${selectedFile}"]`).addClass('active-doc')
        $(`a[href$="${selectedFile}"]`).parent().parent().parent().find('.toc-category').click();
    }
}

function getDocVersions() {
    $.ajax({
        url: '/docs/docversions.json',
        dataType: 'json',
        success: function (docversions) {
            let latest = docversions['latest'];
            let pathName = location.pathname.split('/')[2];
            $.each(docversions['versions'], function (i, version) {
                if (latest === version) {
                    $('#doc-version-dropdown').append(`<a class="dropdown-item" href="/docs/">Latest - ${version.substring(0, 3)}</a>`);
                }
                else {
                    $('#doc-version-dropdown').append(`<a class="dropdown-item" href="/docs/${version.substring(0, 3)}">${version.substring(0, 3)}</a>`);
                }
            });
            if (pathName && (pathName != 'ref')) {
                $('#docs-version-button-display').append(`Docs v${pathName.substring(0, 3)}`);
            }
            else {
                $('#docs-version-button-display').append(`Docs v${latest.substring(0, 3)}`);
            }
        },
        error: function () {
            $(".docs-version-dropdown").css('display', 'none');
        }
    });
}

$(document).ready(function () {
    selectDocInToc();
    getDocVersions();
});
