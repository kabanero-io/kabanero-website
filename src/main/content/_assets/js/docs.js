$(".toc-item").click(function () {
    $(this).toggleClass('open');
    $(this).find(".plus-minus-icon").attr('src') === '/img/icon_plus.png' ? $(this).find(".plus-minus-icon").attr('src', '/img/icon_minus.png') : $(this).find(".plus-minus-icon").attr('src', '/img/icon_plus.png');
})

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
    if (location.pathname.split('/')[2] == 'ref') {
        pathName = '/docs'
    }
    else {
        pathName = `/docs/${location.pathname.split('/')[2]}`
    }
    let selectedFile = `${pathName}/ref/general` + currentHref.substring(currentHref.lastIndexOf('/'));
    if (selectedFile !== `${pathName}/ref/general/docs-welcome.html`) {
        $(`a[href$="${selectedFile}"]`).addClass('active-doc')
        $(`a[href$="${selectedFile}"]`).parent().parent().parent().find('.toc-category').click();
    }
}

function getDocVersions() {
    $.ajax({
        url: '/docs/docversions.json',
        dataType: 'json',
        success: function( docversions ) {
            let latest = docversions['latest'];
            let pathName = location.pathname.split('/')[2];
            $.each(docversions['versions'], function (i, version) {
                if (latest === version) {
                    $('#doc-version-dropdown').append(`<a class="dropdown-item" href="/docs/">Latest - ${version}</a>`);
                }
                else {
                    $('#doc-version-dropdown').append(`<a class="dropdown-item" href="/docs/${version}">${version}</a>`);
                }
            });
            if (pathName && (pathName != 'ref')) {
                $('#docs-version-button-display').append(`Docs v${pathName}`);
            }
            else {
                $('#docs-version-button-display').append(`Docs v${latest}`);
            }
        },
        error: function() {
            $(".docs-version-dropdown").css('display', 'none');
        }
       });
}

$(document).ready(function () {
    selectDocInToc();
    getDocVersions();
});