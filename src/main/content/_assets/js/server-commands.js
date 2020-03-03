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
var commandDocsFolder = '/docs/ref/commands/server/';
var windowFocus = false;

// setup and listen to click on table of content
function addTOCClick() {
    var onclick = function (event) {
        var resource = $(event.currentTarget);
        var currentHref = resource.attr('href');

        // handle the click event ourselves so as to take care of updating the hash 
        event.preventDefault();
        event.stopPropagation();

        loadContent(resource, currentHref, true);

        if (isMobileView()) {
            $('#breadcrumb-hamburger').trigger('click');
        }
    };

    $('#toc-container > ul > li > div').off('click').on('click', onclick);

    $('#toc-container > ul > li > div').off('keypress').on('keypress', function (event) {
        event.stopPropagation();
        // Enter or space key
        if (event.which === 13 || event.keyCode === 13 || event.which === 32 || event.keyCode === 32) {
            $(this).trigger('click');
        }
    });

    addOutlineToTabFocus('#toc-container > ul > li > div');

    $(window).off('focus').on('focus', function(event) {
        windowFocus = true;
    });
}

// setup and listen to click on the See Also section
function addReferenceClick() {
    var onclick = function (event) {
        var resource = $(event.currentTarget);
        var currentHref = resource.attr('href');
        var matchingTOCElement = getTOCElement(currentHref);

        // check that link isn't a full url containing http before updating hash
        if (currentHref.indexOf('http') == -1) {
            // handle the click event ourselves so as to take care of updating the hash 
            event.preventDefault();
            event.stopPropagation();

            loadContent(matchingTOCElement, commandDocsFolder + currentHref, true);

            return false;
        }
    };

    $('#command_content .sect1 .sectionbody p > a').off('click').on('click', onclick);

    $('#command_content .sect1 .sectionbody p > a').off('keypress').on('keypress', function (event) {
        event.stopPropagation();
        // Enter or space key
        if (event.which === 13 || event.keyCode === 13 || event.which === 32 || event.keyCode === 32) {
            $(this).trigger('click');
        }
    });
}

// highlight the selected TOC
function setSelectedTOC(resource) {
    deselectedTOC();
    resource.parent().addClass('toc-selected');
}

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
    $('#command_content').animate({
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
    if (targetTOC.length === 1) {
        setSelectedTOC(targetTOC);
    } else {
        deselectedTOC();
    }
    $('#command_content').load(tocHref, function(response, status) {
        if (status === 'success') {
            updateMainBreadcrumb(targetTOC);
            setupDisplayContent();
            $('footer').show();

            // update hash only if thru normal clicking path
            if (addHash) {
                updateHashInUrl(tocHref);
            }

            $(this).focus(); // switch focus to the content for the reader

            addReferenceClick();
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
    if (href.indexOf(commandDocsFolder) !== -1) {
        hashInUrl = href.substring((commandDocsFolder).length);
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
    $('#command_content').on('mousedown', function(event) {
        mousedown = true;
    });
    $('#command_content').on('focusin', function(e) {
        if (!mousedown) {
            adjustParentWindow();
            $('#command_content').scrollTop(0);
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
                $('#command_content').show();
                $('#breadcrumb-hamburger').show();
                $('#breadcrumb-hamburger-title').show();
            } else {
                $('#command_content').hide();
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
            var tocHref = commandDocsFolder + window.location.hash.substring(1);
            var tocElement = $('#toc-container').find('div[href="" + tocHref + ""]');
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
    addTOCClick();
    addContentFocusListener();
    addHamburgerClick();
    addHashListener();
    addWindowResizeListener();

    //manually tiggering it if we have hash part in URL
    if (window.location.hash) {
        $(window).trigger('hashchange');
    } else {
        selectFirstDoc();
    }
});
