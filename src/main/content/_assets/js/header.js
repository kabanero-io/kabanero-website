/******************************************************************************
 *
 * Copyright 2019 IBM Corporation and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 ******************************************************************************/

function loadWhatsNewModal(){
    let currentVersion = $('#modal-title').text().replace(/[^\d.]/g, '');

    if (localStorage.didOpenWhatsNew === 'false') {
        $('.toast').toast('show');
    }
    else if (currentVersion !== localStorage.getItem('whatsNewVersion')){
        localStorage.setItem('whatsNewVersion', currentVersion);
        localStorage.setItem('didOpenWhatsNew', false);
        $('.toast').toast('show');
    }
    
    $('#whats-new-modal').on('hidden.bs.modal', function () {
        localStorage.setItem('didOpenWhatsNew', true);
    });
    
    $('#whats-new-toast').on('hidden.bs.toast', function () {
        localStorage.setItem('didOpenWhatsNew', true);
    });
}

 // prevent scrolling when navbar dropdown is opened
$(document).ready(function(){
    $('.navbar-toggler').click(function(){

        if ($('.navbar-toggler').hasClass('collapsed')) {
            $('body').css('overflow', 'hidden');
        } else {
            $('body').css('overflow', 'auto');
        }
    });    

    loadWhatsNewModal();
});

