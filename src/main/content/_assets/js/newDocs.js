function loadContent(href){
    $("#general-content").load(href);
}

$(".toc-category").click(function(){
    $(this).parent().toggleClass('open');
});

$(".doc-title").click(function(){
    loadContent($(this).attr('href'));
    $('.activeDoc').removeClass('activeDoc');
    $(this).addClass('activeDoc');
})