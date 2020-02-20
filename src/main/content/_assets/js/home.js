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

function hideAllFeaturedModelsCollapses(){
    $('.featuredModelsCollapse').collapse('hide');
    $('.featured-model-box').removeClass('selectedStack');
}

function hideAllOpenSourcePlatformsCollapses(){
    let id = $(this).data('topic');

    $('.open-source-platform-content-box').hide();
    $(`#open-source-platform-${id}-collapse`).show();

    $('.open-source-platform-box-selected').removeClass('open-source-platform-box-selected');

    $(`#open-source-platform-${id}-box`).addClass('open-source-platform-box-selected');

    $('.open-source-platform-vertical-separator-visible').removeClass('open-source-platform-vertical-separator-visible');
    $(`#open-source-platform-${id}-separator`).addClass('open-source-platform-vertical-separator-visible');
}

$( document ).ready(function() {
    $('.open-source-platform-box').on('click keypress', hideAllOpenSourcePlatformsCollapses);
    // keypress is for accessibility. We put tabindex on the div (instead of the button) so the highlight 
    // is over the whole element when tabbed into focus. The button doesn't get highlighted when tabbed due to css on it
    $('.model-logo > button').on('click keypress', hideAllFeaturedModelsCollapses);
    $('.model-logo').on('keypress', function(){$(this).children('button').click();});

    // Let the document know when the mouse is being used
    $(document.body).on('mousedown', function() {
        document.body.classList.add('using-mouse');
    });
    
    $(document.body).on('keydown', function() {
        document.body.classList.remove('using-mouse');
    });
});

$('.featured-model-box').click(function() {
    $('.featured-stacks-collapse:visible').collapse('hide');
});
 
function hoverFeaturedStack(element){
    element.setAttribute('src', '/img/collections-icon-rollover.png');
}
 
function unhoverFeaturedStack(element){
    element.setAttribute('src', '/img/collections-icon.png')
}
