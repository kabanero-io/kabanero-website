function loadContent(href){
    $("#general-content").load(href);
}

$(".toc-category").click(function(){
    $(this).parent().toggleClass('open');
    console.log($(this).parent().find(".plus-minus-icon").attr('src') === '/img/icon_plus.png');
    $(this).parent().find(".plus-minus-icon").attr('src') === '/img/icon_plus.png' ? $(this).parent().find(".plus-minus-icon").attr('src', '/img/icon_minus.png') : $(this).parent().find(".plus-minus-icon").attr('src', '/img/icon_plus.png');
});

$(".doc-title").click(function(){
    loadContent($(this).attr('href'));
    $('.activeDoc').removeClass('activeDoc');
    $(this).addClass('activeDoc');
});

function selectDocInToc(){
    let currentHref = window.location.href;
    let selectedFile = '/docs/ref/general' + currentHref.substring(currentHref.lastIndexOf('/'));
    $(`a[href$="${selectedFile}"]`).addClass('active-doc')
    $( `a[href$="${selectedFile}"]` ).parent().parent().parent().find('.toc-category').click();
}

$(document).ready(function(){
    selectDocInToc();
});