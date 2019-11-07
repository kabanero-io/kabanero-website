/*******************************************************************************
 -
 - Copyright 2019 IBM Corporation and others.
 -
 - Licensed under the Apache License, Version 2.0 (the 'License');
 - you may not use this file except in compliance with the License.
 - You may obtain a copy of the License at
 -
 -     http://www.apache.org/licenses/LICENSE-2.0
 -
 - Unless required by applicable law or agreed to in writing, software
 - distributed under the License is distributed on an 'AS IS' BASIS,
 - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 - See the License for the specific language governing permissions and
 - limitations under the License.
 -
 *******************************************************************************/
// Keep the table of contents (TOC) in view while scrolling (Desktop only)
function handleFloatingTableOfContent() {
    if (window.innerWidth >= threeColumnBreakpoint || window.innerWidth >=  twoColumnBreakpoint) {
        // CURRENTLY IN 3 COLUMN VIEW
        // The top of the TOC is scrolling off the screen, enable floating TOC.
        if(isBackgroundBottomVisible()) {
            handleTOCScrolling();
            shrinkTOCIndicator();
        } else {
            // The entire viewport is filled with the background, so
            // do not need to worry about the TOC flowing out of the background.
            enableFloatingTOC();
            expandTOCIndicator();
        }
    } else {
        // CURRENTLY IN MOBILE VIEW OR 2 COLUMN VIEW
        // Remove any floating TOC
        disableFloatingTOC();
    }
}

function disableFloatingTOC() {
    $('#toc-inner').width('').css({'position': '', 'top': ''});
}

function enableFloatingTOC() {
    // The toc has a fixed position- this will allow it to scroll with the user and stay "snapped" at the top once the header disappears
    var heightOfHeaderPix = 100;
    var pixFromTop = $(window).scrollTop();
    var newTop = heightOfHeaderPix - pixFromTop;
    var tocTop = newTop < 0 ? 0 : newTop;
    $('#toc-inner').css({'position':'fixed', 'top': tocTop});    
}

function calculateTOCHeight(){
    var endOfGuidePosition = $('#end_of_guide')[0].getClientRects()[0].top;
    var headerHeight = $('header').height();
    return endOfGuidePosition - headerHeight;
}

function shrinkTOCIndicator() {
    $('#toc-line').css({
        'position': '', 
        'top': '',
        'height': calculateTOCHeight()
    });
}

function expandTOCIndicator() {
    $('#toc-line').css({
        'position':'fixed',
        'top':'101px',
        'height': calculateTOCHeight()
    });
}

// Remove previous TOC section highlighted and highlight correct step
function updateTOCHighlighting(id) {
    $('.liSelected').removeClass('liSelected');
    var anchor = $(`#toc-container a[href="#${id}"]`);
    anchor.parent().addClass('liSelected');
}

// Handle when the table of content (TOC) is too small to fit completely in the dark background.
// We want to give the end result of the bottom of the TOC sticks to the bottom of the dark background
// and the top of the TOC scrolls off screen.
function handleTOCScrolling() {
    var visible_background_height = heightOfVisibleBackground();
    var toc_height = $('#toc-inner').height();
    if (toc_height > visible_background_height) {
        // The TOC cannot fit in the dark background, allow the TOC to scroll out of viewport
        // to avoid the TOC overflowing out of the dark background
        var negativeNumber = visible_background_height - toc_height + 100;
        $('#toc-inner').css({'position':'fixed', 'top':negativeNumber});
    }
}

function handleFloatingTOCAccordion() {
    var accordion = $('#mobile-toc-accordion-container');

    var enableFloatingTOCAccordion = function(){
        // Put the TOC accordion back into the page and remove the
        // scroller-anchor <div>.
        accordion.removeClass('fixed_toc_accordion');
        $('.scroller-anchor').css('height', 0);
        // Restore toc location.
        $('#toc-column').css('margin-top', '0px');
    };
    var disableFloatingTOCAccordion = function(){
        // Change the height of the scroller-anchor to that of the accordion
        // so there is no change in the overall height of the page.
        // Otherwise, when you fix the accordion to the top of the page the
        // overall document height is lessened by the accordion's height
        // which causes a bounce in the page.
        $('.scroller-anchor').css('height', accordion.height());
        // Fix the TOC accordion to the top of the page.
        accordion.addClass('fixed_toc_accordion');        
    };

    if(inSingleColumnView()){
        // Get the accordion start location.  It is the same as
        // scroller-anchor, a <div> that initially has a height of 0.
        var scroller_anchor = $('.scroller-anchor').offset().top;
        // Check if user has scrolled and the current scroll position is below
        // where the scroller-anchor starts and the accordion has not yet been
        // fixed to the top of the page.
        if ($(this).scrollTop() >= scroller_anchor && accordion.css('position') !== 'fixed') {
            disableFloatingTOCAccordion();
        } else if ($(this).scrollTop() < scroller_anchor && accordion.css('position') !== 'relative') {
            // When the user scrolls back up past the scroller-anchor, put the
            // accordion back into the page and remove the scroller-anchor <div>.
            enableFloatingTOCAccordion();
        } else {
            //mobile-toc-accordion blocks the top part of the TOC column, need to add margin so that 'X' in TOC is visible
            var tocDistanceFromTop = $('#toc-column').offset().top;
            if ($(this).scrollTop() >= tocDistanceFromTop) {
                $('#toc-column').css('margin-top', '40px');
            }
        }
    }
    else{
        enableFloatingTOCAccordion();
    }
}

/**
 * onClick method for selecting a TOC entry.
 *
 * @param {*} liElement TOC entry selected
 * @param {*} event
 */
function TOCEntryClick(liElement, event) {
    // 'this' is the li element in the #toc-container.
    // Its first child is the anchor tag pointing to the id of the section to go to.
    var hash = $(liElement).find('a').prop('hash');

    // Handle our own scrolling to the appropriate section so stop event processing.
    event.preventDefault();
    event.stopPropagation();

    // Close the TOC if not in 3 column view
    if(inSingleColumnView()){
        $('#mobile-close-container').trigger('click');
    } else if(window.innerWidth < threeColumnBreakpoint){
        $('#breadcrumb-hamburger').trigger('click');
    }

    var windowHash = window.location.hash;
    if (windowHash !== hash) {
        // Update the URL hash with where we wish to go....
        var currentPath = window.location.pathname;
        var newPath = currentPath.substring(currentPath.lastIndexOf('/')+1) + hash;
        // Not setting window.location.hash here because that causes the
        // window to scroll immediately to the section.  We want to implement
        // smooth scrolling that is adjusted to account for the sticky header.
        // So, this history.replaceState will allow us to set the URL without
        // invoking immediate scrolling.  Then we call accessContentsFromHash
        // to perform the smooth scrolling to the requested section.
        history.replaceState(null, null, newPath);
    }
    accessContentsFromHash(hash);
}

// Restructure the TOC because Asciidoc nests levels in the TOC and it affects the CSS poorly.
function reorganizeTOCElements(){
    $('#toc-column .sectlevel2').each(function(){
        var li = $(this).parent();
        var sectlevel2 = $(this).detach();
        li.after(sectlevel2);
    });
}

function restoreCurrentStep(){
    // Restore user to section they were viewing after collapsing/expanding the TOC.
    var hash = window.location.hash;
    accessContentsFromHash(hash);
}

function open_TOC(){
    if(!inSingleColumnView()){        
        $('#toc-title').css('margin-top', '0px');
        $('#toc-column').addClass('block');
        $('#guide-column').removeClass('expanded');

        $('#toc-line').addClass('open');            
        $('#toc-column').addClass('open');
        $('#guide-column').addClass('open');

        $('#toc-indicator').addClass('open hidden');
        $('#code-column').width('40vw');
        $('#normal-guide-guide-section').removeClass('guide-column-section');

        
        restoreCurrentStep();
    }
}

function close_TOC(){
    $('#toc-title').css('margin-top', '20px');

    // Remove display type from the table of contents
    $('#toc-column').removeClass('block');

    // Update the width of the guide-column to accomodate the larger space when the browser is in 3 column view.
    $('#guide-column').addClass('expanded');

    // Remove open class to transition back
    $('#toc-line').removeClass('open');
    $('#toc-column').removeClass('open');
    $('#guide-column').removeClass('open');

    $('#toc-indicator').removeClass('open hidden');
    $('#normal-guide-guide-section').addClass('guide-column-section');

    // let code column resize with its containing col class
    // need this because fixed position doesn't care about the parent col
    let codeColumn = $('#code-column');
    codeColumn.width(codeColumn.parent().width());

    restoreCurrentStep();
}

function setInitialTOCLineHeight(){  
    $('#toc-line').css(
        {'height': calculateTOCHeight()}
    );
}


$(document).ready(function() {
    
    reorganizeTOCElements();
    setInitialTOCLineHeight();    

    // Add listener for clicking on the
    $('#toc-hotspot, #toc-indicator').on('mouseenter', function(){
        // Animate out the arrow and highlight the left side of the screen orange to indicate there is a TOC
        if(!$('#toc-column').hasClass('open')){
            $('#toc-line').css(
                {'background-color': 'rgb(255, 216, 191)'}
            );
            $('#toc-indicator').addClass('open');            
        }        
    });

    $('#toc-indicator').mouseleave(function(){
        $('#toc-indicator').removeClass('open');
    });

    $('#toc-hotspot').on('mouseleave', function(){
        if(!$('#toc-column').hasClass('open')){
            var x = event.x;
            var y = event.y;
            var headerHeight = $('header').height();
            var indicatorHeight = $('#toc-indicator').outerHeight();
            
            y = y - headerHeight;
            if(x >= 0 && x <= this.offsetWidth && y >= 0 && y <= indicatorHeight){
                // Still hovering over the TOC indicator arrow, so don't remove the orange line and arrow.
                return;
            }

            $('#toc-line').css(
                {'background-color': 'transparent'}
            );  
            $('#toc-indicator').removeClass('open');
        }        
    });

    $('#toc-indicator').on('click', function(){
        open_TOC();
    });

    $('#toc-indicator').on('keydown', function(e){
        if(e.which === 13){
            open_TOC();
        }
    });
    
    $('#breadcrumb-hamburger').on('click', function(){
        // Handle resizing of the guide column when collapsing/expanding the TOC in 3 column view.
        if(window.innerWidth >= threeColumnBreakpoint){
            if ($('#toc-column').hasClass('in')) {
                // TOC is expanded
                $('#guide-column').addClass('expanded');
            }
            else {
                // TOC is closed
                $('#guide-column').removeClass('expanded');
            }
            restoreCurrentStep();
        }
        // Handle table of content floating if in the middle of the guide.
        handleFloatingTableOfContent();        
    });

    //In single column view, set focus on 'X' initially when TOC is expanded
    $('#toc-column').on('shown.bs.collapse', function(){
        if ($('#mobile-close-container').attr('class').trim().length == 0) { //TOC is visible, doesn't have class 'collapsed'
            $('#mobile-close-container  img').focus(); //focus on 'X'
        }
    });

    //In single column view, close the TOC after tabbing from the last element in the TOC
    //and focus on the first tabbable element in the first step
    $('#tags-container').on('keydown', function(){
        if(inSingleColumnView()) {
            var tagWithFocus = $(document.activeElement);
            var lastTag = $('#tags-container').children().last();
            if (tagWithFocus.is(lastTag)) { //tabbing from the last tag in TOC
                //hide the toc
                $('#mobile-close-container').click();
            }
        }
    });

    //Hide the TOC when the ESC key is hit (in single column view)
    $('#toc-column').on('keydown', function(e){
        if(inSingleColumnView()) {
            if(e.which == 27){ //ESC key code
                //hide the toc
                $('#mobile-close-container').click();
            }
        }
    });

    // Handle collapsing the table of contents from full width back into an orange line on the left side of the page.
    $('#close-container').on('click', function() {
        close_TOC();
    });

    $('#close-container img').on('keydown', function(event) {
        // Enter key
        if(event.which === 13 || event.keyCode === 13){
            $('#close-container').click();
        }
    });

    $('#mobile-close-container img').on('keydown', function(event) {
        // Enter key
        if(event.which === 13 || event.keyCode === 13){
            $('#mobile-close-container').click();
        }
    });

    // These handlers only work for static guides.   At the time this
    // code executes, the TOC items for the interactive guides are not yet built.
    // So the following is basically a no-op for the interactive guides.
    // However, this code is duplicated in
    // ...iguides-common\js\interactive\guides\table-of-contents.js
    // to set the same handlers there.
    $('#toc-container').on('click', 'li', function(event) {
        // 'this' is the li element in the #toc-container
        TOCEntryClick(this, event);
    });
    $('#toc-container').on('keydown', 'li', function(event) {
        // 'this' is the li element in the #toc-container
        if (event.which === 13 || event.which === 32) {   // Spacebar or Enter
            this.click();
        }
    });
});