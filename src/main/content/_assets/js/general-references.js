/******************************************************************************
 *
 * Copyright 2019 IBM Corporation and others.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 ******************************************************************************/

var mobileWidth = 767;
var generalDocsFolder = '/docs/ref/general/';
var windowFocus = false;

$('.doc-title').click(function(){
    deselectedTOC();
    $(this).parent().addClass('toc-selected');
    loadContent($(this), $(this).attr('href'), true);
});

// deselect current TOC
function deselectedTOC(r) {
    var currentTOCSelected = $('.toc-selected');
    if (currentTOCSelected.length === 1) {      
        currentTOCSelected.removeClass('toc-selected');
    }
}


function getTOCElement(href) {
    return $('#toc-container > ul > li > div[href$="" + href + ""]');    
}

// Add extra css to the doc, set the doc height, and scroll to the content
function setupDisplayContent() {
    setContainerHeight();
    adjustParentWindow();
    $('#general-content').animate({
        scrollTop: 0
    }, 400);
}

// This function
// - highlight the selected TOC 
// - load the doc for the selected TOC
// - update main bread crumb 
// - show the display content, 
// - update hash if requested
function loadContent(targetTOC, tocHref, addHash) {
    $('footer').hide();
    $('#general-content').load(tocHref, function(response, status) {
        if (status === 'success') {
            updateMainBreadcrumb(targetTOC);
            setupDisplayContent();
            $('footer').show();

            // update hash only if thru normal clicking path
            if (addHash) {
                updateHashInUrl(tocHref);
            }

            $(this).focus(); // switch focus to the content for the reader

        } else {
            $('footer').show();
        }
    });
}

// events to detect keyboard focus and add outline to the element. Outline will not
// be added if the focus is thru mouse event.
function addOutlineToTabFocus(selector) {
    $(selector).off('blur').on('blur', function(event) {
        if ($(this).hasClass('addFocus')) {
            $(this).removeClass('addFocus');
        }
    });

    var mousedown = false;
    $(selector).off('mousedown').on('mousedown', function(event) {
        mousedown = true;
    });

    $(selector).off('focusin').on('focusin', function(event) {
        if (!mousedown && !windowFocus) {
            $(this).addClass('addFocus');
            // scroll the parent window back up if it is scroll down
            adjustParentWindow();
        }
        mousedown = false;
        windowFocus = false;
    });
}

// update the main breadcrumb
function updateMainBreadcrumb(resource, attrForTitle) {
    var lastBreadcrumb = $('.breadcrumb.fluid-container').find('li:last-child');
    var lastBreadcrumbAnchorTag = lastBreadcrumb.find('a');
    if (lastBreadcrumbAnchorTag.hasClass('inactive-link')) {
        // remove existing inactive link
        lastBreadcrumb.remove();
    }

    if (resource !== undefined) {
        // use default title or title retrieved from the passed in attribute
        var title = resource.text();
        if (attrForTitle) {
            title = resource.attr(attrForTitle);
        }
        $('.breadcrumb.fluid-container').append('<li><a class="inactive-link">' + title + '</a></li>');
    }
}

// update hash in the url and set lastClickElementHref to be the same value as set in the hash
// so that when hashchange is triggered, there is no need to handle the event.
function updateHashInUrl(href) {
    var hashInUrl = href;
    if (href.indexOf(generalDocsFolder) !== -1) {
        hashInUrl = href.substring((generalDocsFolder).length);
    }

    //lastClickElementHref = hashInUrl;
    window.location.hash = '#' + hashInUrl;
}

// check if mobile view or not
function isMobileView() {
    if ($(window).width() <= mobileWidth) {
        return true;
    } else {
        return false;
    }
}

// set the container height so that the table of content is using the viewport to display its content
// without scrolling issue
function setContainerHeight() {
    if (!isMobileView()) {  
        // the height is viewport - header so that the last toc will be in 
        // view without the need to scroll the outer container
        $('#background-container').css('height', $(window).height() - $('header').height()); 
        $('#background-container').css('margin-bottom', '60px');     
    }
}

// select the first doc in the table of content
function selectFirstDoc() {
    if (!isMobileView()) {
        var firstTOCElement = $('#toc-container > ul > li > div').first();
        loadContent(firstTOCElement, firstTOCElement.attr('href'));
        return firstTOCElement;
    }
}

// If parent window is scrolled down to the footer, it will shift the top of toc and doc content up
// behind the fixed header. As a result, the backward tabbing towards the top (either toc or doc content)
// would result in not seeing the toc or top of the doc. This function will shift the parent window back
// to the top.
function adjustParentWindow() {
    if ($(window.parent.document).scrollTop() > 0) {
        $(window.parent.document).scrollTop(0);
    }    
}

// If the doc content is in focus by means of other than a mouse click, then goto the top of the 
// doc.
function addContentFocusListener() {
    var mousedown = false;
    $('#general-content').on('mousedown', function(event) {
        mousedown = true;
    });
    $('#general-content').on('focusin', function(e) {
        if (!mousedown) {
            adjustParentWindow();
            $('#general-content').scrollTop(0);
        }
        mousedown = false;
    });
}

// setup and listen to hamburger click event
function addHamburgerClick() {
    if (isMobileView()) {
        var hamburger = $('.breadcrumb-hamburger-nav');

        hamburger.on('click', function (e) {
            if ($('#toc-column').hasClass('in')) {
                $('#general-content').show();
                $('#breadcrumb-hamburger').show();
                $('#breadcrumb-hamburger-title').show();
            } else {
                $('#general-content').hide();
                $('#breadcrumb-hamburger').hide();
                $('#breadcrumb-hamburger-title').hide();
                $('#background-container').css('height', 'auto');
                if (window.location.hash) { 
                    updateHashInUrl('');
                }
            }
        });
    }
}

// scroll the selected table of content in viewport
function scrollToTOC(tocElement) {
    if (!isMobileView()) {
        var headerHeight = $('header').height();
        var currentTOCTop = $('#toc-column').scrollTop();
        // factor in the header height as the element top is still a positive number when the
        // element is behind the header
        var elementTop = tocElement[0].getBoundingClientRect().top - headerHeight;
        var tocClientHeight = $('#toc-column')[0].clientHeight;
        var tocScrollHeight = $('#toc-column')[0].scrollHeight;
       
        if (elementTop < 0 || (elementTop > 0 && 
                            elementTop > tocClientHeight)) {
            var scrollTo = currentTOCTop + elementTop - headerHeight + 50;
            // if we cannot scroll the element to the top cuz the end of the TOC has reached,
            // adjust the scrollTo position to show the last page of TOC elements
            if (scrollTo + tocClientHeight > tocScrollHeight) {
                scrollTo = tocScrollHeight - tocClientHeight + headerHeight + 50;
            }
            $('#toc-column').animate({
                scrollTop: scrollTo
            }, 400);
        }
        
    }
}

//attach the hashchange event listener
function addHashListener() {
    $(window).on('hashchange', function () {
        if (window.location.hash) {
            var tocHref = generalDocsFolder + window.location.hash.substring(1);
            var tocElement = $('#toc-container').find(`div[href="${tocHref}"]`);
            if (tocElement.length === 1) {
                scrollToTOC(tocElement);
            }
            // attempt to load as it could be a reference doc that is not in table of content
            loadContent(tocElement, tocHref);
            if (isMobileView() && $('#toc-column').hasClass('in')) {
                $('.breadcrumb-hamburger-nav').trigger('click');
            }
        } else {
            if (isMobileView()) {
                if (!$('#toc-column').hasClass('in')) {
                    $('.breadcrumb-hamburger-nav').trigger('click');
                }
            } else {
                scrollToTOC(selectFirstDoc());
            }
        }
    });
}

// Take care of displaying the table of content, command content, and hamburger correctly when
// browser window resizes from mobile to non-mobile width and vice versa.
function addWindowResizeListener() {
    $(window).resize(function() {
        if (isMobileView()) {
            addHamburgerClick();
        } else {
            if (!$('#toc-column').hasClass('in')) {
                $('.breadcrumb-hamburger-nav').trigger('click');
            }
            $('#breadcrumb-hamburger').hide();
            $('#breadcrumb-hamburger-title').hide();
            setContainerHeight();
        }
    });
}

$(document).ready(function () {  
    addContentFocusListener();
    addHamburgerClick();
    addHashListener();
    addWindowResizeListener();
    
    //manually tiggering it if we have hash part in URL
    if (window.location.hash) {
        $(window).trigger('hashchange');
        selectDocFromHash();
    } else {
        loadContent($('#intro-hidden'), '/docs/ref/general/docs-welcome.html');
    }
});

function selectDocFromHash(){
    let pageLocation = window.location.hash;
    pageLocation = pageLocation.substring(1); //take the '#' off of the front of the hash
    let selectedDocLink = $( `div[href$="${pageLocation}"]` ); //jQuery endswith selector finds the div with the href of the doc in the url
    let selectedCategory = $(selectedDocLink).data('category');
    $(`#${selectedCategory}`).click(); //drop down the twistie
    $(selectedDocLink).click(); //highlight the selected doc
}

function toggleIcon(button) {
    //toggle the button that was clicked
    let iconId = $(button).data('icon');
    if($(`#${iconId}`).attr('src') === '/img/icon_plus.png'){
        $(`#${iconId}`).attr('src', '/img/icon_minus.png');
    }else{
        $(`#${iconId}`).attr('src', '/img/icon_plus.png');
    }
}

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
            let parentElement = $(value).parent();
            !docTitle.includes(searchTerm) && !parentElement.hasClass('toc-selected') ? $(parentElement).hide() : $(parentElement).show();
            console.log(!docTitle.includes(searchTerm) && !parentElement.hasClass('toc-selected'));
        }
    });
    hideCategoriesIfEmpty();
    $('.doc-category:visible').length === 1 ? $('#noSearchResults').removeClass('no-display') : $('#noSearchResults').addClass('no-display');
}

function hideCategoriesIfEmpty(){
    let categories = $('.doc-category');
    $.each(categories, function(index, category){
        if($(category).attr('id') !== 'welcome-doc'){
            let collapseId = $(category).data('target');
            let childLinks = $(collapseId).find('.doc-link');
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
