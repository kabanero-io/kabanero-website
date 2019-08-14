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

if ($('#whatsNewModal').attr('href')) {
    $("#modal-body").load($('#whatsNewModal').attr('href'));
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
    
    let version = `"${$('#general_title').text().replace(/[^\d.]/g, '')}"`;
    let localStorageValue = localStorage.getItem('whatsNew');
    localStorageValue = localStorageValue ? JSON.parse(localStorageValue) : {};

    function updateLocalStorageValue(whatsNewVersion, didOpenWhatsNew){
        localStorageValue['whatsNewVersion'] = whatsNewVersion;
        localStorageValue['didOpenWhatsNew'] = didOpenWhatsNew;
        localStorage.setItem('whatsNew', JSON.stringify(localStorageValue));
    }
    
    if (version === localStorageValue['whatsNewVersion']) {
        if (!localStorageValue['didOpenWhatsNew']) {
            $('.toast').toast('show');
        }
    }
    else if (version !== localStorageValue['whatsNewVersion']) {
        updateLocalStorageValue(version, false)
        $('.toast').toast('show');
    }

    $('#whatsNewModal').on('hidden.bs.modal', function () {
        updateLocalStorageValue(version, true)
    });
        
    $('#whats-new-toast').on('hidden.bs.toast', function () {
        updateLocalStorageValue(version, true)
    });
});


