function loadContent(href){
    $("#general-content").load(href);
}

$(".toc-category").click(function(){
    $(this).parent().toggleClass('open');
    $(this).parent().find(".plus-minus-icon").attr('src') === '/img/icon_plus.png' ? $(this).parent().find(".plus-minus-icon").attr('src', '/img/icon_minus.png') : $(this).parent().find(".plus-minus-icon").attr('src', '/img/icon_plus.png');
});

$(".doc-title").click(function(){
    loadContent($(this).attr('href'));
    $('.activeDoc').removeClass('activeDoc');
    $(this).addClass('activeDoc');
});

$('#doc-search').keyup(function(){
    searchDocs();
});

function searchDocs(){
    let searchTerm = document.getElementById('doc-search').value.toLowerCase();
    let docTitles = $('.doc-title');
    $.each(docTitles, function(index, value){
        if($(value).attr('id') !== 'welcome-doc'){
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

function hideCategoriesIfEmpty(){
    let categories = $('.toc-item');
    $.each(categories, function(index, category){
        if($(category).attr('id') !== 'welcome-doc'){
            let childLinks = $(category).find('.doc-title');
            let isVisible = areLinksVisible(childLinks);
            isVisible ? $(category).show() : $(category).hide();
        }
    });
}

function areLinksVisible(links){
    let areVisible = false;
    $.each(links, function(index, link){
        if($(link).css('display') !== 'none'){
            areVisible = true;
        }
    });
    return areVisible;
}

function selectDocInToc(){
    let currentHref = window.location.href;
    let selectedFile = '/docs/ref/general' + currentHref.substring(currentHref.lastIndexOf('/'));
    if(selectedFile !== '/docs/ref/general/docs-welcome.html'){
        $(`a[href$="${selectedFile}"]`).addClass('active-doc')
        $( `a[href$="${selectedFile}"]` ).parent().parent().parent().find('.toc-category').click();
    }
}

$(document).ready(function(){
    selectDocInToc();
});