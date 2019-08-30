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

    let ul = $("<ul/>", { class: "sectlevel1" });
    $('div#guide-content-section h2, h3').each(function (i, header) {
        if (header.id !== "toc-title" && header.id !== "tag-title" && header.id !== "improve_guide_feedback" && header.id !== "need_help" && header.id !== "where_to_next") {
            if (header.nodeName === "H2") {
                let li = $("<li/>");
                let a = $("<a/>");
                a.attr('href', `#${header.id}`)
                a.text(`${header.innerHTML}`)
                li.append(a)
                ul.append(li)
            }
            if (header.nodeName === "H3") {
                let ul = $("<ul/>", { class: "sectlevel2" });
                let li = $("<li/>");
                let a = $("<a/>");
                a.attr('href', `#${header.id}`)
                a.text(`${header.innerHTML}`)
                li.append(a)
                ul.append(li)
                $('.sectlevel1').append(ul)
            }
        }
        $("#toc-container").append(ul)
    });

});