$(document).ready(function () {
    let guideContentSection = $('#guide-content-section');

    $('div#guide-content-section h2').each(function (i, header) {
        let sect1 = $("<div/>", { class: "sect1" });
        let sectionbody = $("<div/>", { class: "sectionbody" });
        let paragraph = $("<div/>", { class: "paragraph" });

        $(`#${header.id}`).nextUntil($(`h2`)).each(function (index, element) {
            sect1.append(header)
            if (element.className !== 'sect1') {
                paragraph.append(element);
            }
            if (element.nodeName === 'H3') {
                let sect2 = $("<div/>", { class: "sect2" });
                sect2.append(element)
                paragraph.append(sect2);
            }
        });
        sectionbody.append(paragraph);
        sect1.append(sectionbody);
        guideContentSection.append(sect1);
    });


    $('#toc-container').append($('#markdown-toc'))
    if ($('#markdown-toc > li > ul')) {
        $('#markdown-toc > li > ul').addClass('sectlevel2')
    }

    var li = $("<li/>");
    var a = $("<a/>");
    var end_of_guide_title = $('#end_of_guide > h2').first().text();
    a.attr('href', '#end_of_guide');
    a.text(end_of_guide_title);
    li.append(a);
    $("#toc-container > ul").append(li);

});