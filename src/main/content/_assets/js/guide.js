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

$(document).ready(function() {
    
    var offset;	
    var target;	
    var target_position;	
    var target_width;	
    var target_height;

    $('#preamble').detach().insertAfter('#duration-container');  

    $('#mobile-github-clone-popup-copy').click(function(event){
        event.preventDefault();
        target = $('#mobile-github-clone-popup-repo > span').get(0);
        copy_element_to_clipboard(target, function(){
            var current_target_object = $(event.currentTarget);
            var position = current_target_object.position();	
            $('.guide-section-copied-confirmation').css({	
                top: position.top - 20,	
                right: 25	
            }).stop().fadeIn().delay(1000).fadeOut();
        });
    });

    $('#github-clone-popup-copy, #mobile-github-clone-popup-copy').on('keydown', function(event){
        if(event.which === 13 || event.keyCode === 13){
            $(this).trigger('click');
        }
    });

    function handleSectionChanging(event){
        // Get the id of the section most in view
        var id = getScrolledVisibleSectionID();
        if (id !== null) {
            var windowHash = window.location.hash;
            var scrolledToHash = id === '' ? id : '#' + id;
            if (windowHash !== scrolledToHash) {
                // Update the URL hash with new section we scrolled into....
                var currentPath = window.location.pathname;
                var newPath = currentPath.substring(currentPath.lastIndexOf('/')+1) + scrolledToHash;
                // Not setting window.location.hash here because that causes an
                // onHashChange event to fire which will scroll to the top of the
                // section.  replaceState updates the URL without causing an
                // onHashChange event.
                history.replaceState(null, null, newPath);

                // Update the selected TOC entry
                updateTOCHighlighting(id);                    
            }
            if(window.innerWidth > twoColumnBreakpoint) {
                // multipane view
                // Match the code block on the right to the new id
                if(typeof(showCorrectCodeBlock) === 'function'){
                    showCorrectCodeBlock(id, null, true);
                }
            }
        }
    }


    $('#guide-content pre:not(.no_copy pre):not(.code_command pre):not(.hotspot pre)').each(function(index) {
        if(!$('#guide-content pre')[index].className){
        let copy_element_to_clipboard_img = `<div class="guide-section-copied-confirmation">Copied to clipboard</div> <img class="copy-to-clipboard" src='/img/guides-copy-button.svg' alt='Copy code block' title='Copy code block'>`
        $('#guide-content pre')[index].innerHTML = $('#guide-content pre')[index].innerHTML + copy_element_to_clipboard_img; 
    }
    });
    
    $('#guide-content pre .copy-to-clipboard').click(function(event) {
        event.preventDefault();
        let text = $(this).parent().get(0).innerText;
        let textToCopy = document.createElement('textarea');
        textToCopy.value = text;
        document.body.appendChild(textToCopy);
        textToCopy.select();
        document.execCommand('copy');
        document.body.removeChild(textToCopy);
        // Target was assigned while hovering over the element to copy.
        copy_element_to_clipboard(target, function(){
            var current_target_object = $(event.currentTarget);
            var position = current_target_object.position();	
            $('.guide-section-copied-confirmation').css({	
                top: position.top - 45,
                right: inSingleColumnView() ? 20 : 50	
            }).stop().fadeIn().delay(3500).fadeOut();
        });	
    });

    // show content for clicked OS tab
    $('.tab_link').click(function(event) {
        // hide all tab content and remove active class from all links
        $('.tab_content').hide();
        $('.tab_link').removeClass('active');
        
        // get class of clicked tab and class of its respective content section
        var class_list = this.classList;
        for (var i = 0; i < class_list.length; i++) {
            var class_name = class_list[i];
            if (class_name !== 'tab_link' && class_name.indexOf('_link') > -1) {
                var tab_content = '.' + class_name.replace('link', 'section');
                var tab_class = '.' + class_name;
            }
        }

        // show content of clicked tab and add active class to clicked tab
        $(tab_content).show();
        $(tab_class).addClass('active');
    });

    // determine user's operating system and show prerequisite instructions for that OS
    function setDefaultTab() {
        // set default OS to windows
        var OSName = 'windows';
        // get user's operating system
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('win') != -1) {
            OSName = 'windows';
        }
        if (ua.indexOf('mac') != -1) {
            OSName = 'mac';
        }
        if (ua.indexOf('linux') != -1) {
            OSName = 'linux';
        }
        // hide tab content except for selected tab and add active class to selected tab
        var os_section = '.' + OSName + '_section';
        var os_class = '.' + OSName + '_link';
        $('.tab_content').hide();
        $(os_section).show();
        $(os_class).addClass('active');
    }

    $(window).on('scroll', function(event) {
        // Check if a scroll animation from another piece of code is taking place and prevent normal behavior.
        if($('body').data('scrolling') === true){
            return;
        }
        handleSectionChanging(event);
    });

    $(window).on('load', function(){
        createEndOfGuideContent();
        setDefaultTab();

        if (location.hash){
            handleFloatingTableOfContent();
            var hash = location.hash;
            accessContentsFromHash(hash);
        }
    });
});