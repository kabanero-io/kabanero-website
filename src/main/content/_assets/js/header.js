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

function updateLocalStorageValue(key, value){
    localStorage.setItem(key, value);
}

function loadWhatsNewModal(){
    let currentVersion = $('#general_title').text().replace(/[^\d.]/g, '');
    if (currentVersion === localStorage.getItem('whatsNewVersion') && !JSON.parse(localStorage.didOpenWhatsNew)) {
        $('.toast').toast('show');
    }
    else if (currentVersion !== localStorage.getItem('whatsNewVersion')){
        updateLocalStorageValue('whatsNewVersion', currentVersion);
        updateLocalStorageValue('didOpenWhatsNew', false);
        $('.toast').toast('show');
    }
    
    $('#whatsNewModal').on('hidden.bs.modal', function () {
        updateLocalStorageValue('didOpenWhatsNew', true);
    });
    
    $('#whats-new-toast').on('hidden.bs.toast', function () {
        updateLocalStorageValue('didOpenWhatsNew', true);
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
    
    if ($('#whatsNewModal').attr('href')) {
        $(".modal-body").load($('#whatsNewModal').attr('href'), function(response, status) {
            if (status === "success") {
                loadWhatsNewModal();
            }
        });
    }
});

