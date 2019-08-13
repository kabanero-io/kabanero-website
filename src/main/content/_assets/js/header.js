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

// prevent scrolling when navbar dropdown is opened
$(document).ready(function() {

    $('.navbar-toggler').click(function(){

        if ($('.navbar-toggler').hasClass('collapsed')) {
            $('body').css('overflow', 'hidden');
        } else {
            $('body').css('overflow', 'auto');
        }
    });

    let docHref = $('#exampleModalCenter').attr('href');
    $.get(docHref, function (data) {
        $('#modal-title').html(($(data).find("#general_title")[0]).innerHTML);
        $('#modal-body').html(($(data).find(".paragraph")[0]).innerHTML);
    });

    if($('#modal-title')[0].innerHTML){
        let version = $('#modal-title')[0].innerHTML.match(/[\d\.]+/g);
    
        if(version === localStorage.whatsNew.whatsNewVersion){
            if(!localStorage.whatsNew.didOpenWhatsNew){
                $("#whats-new-modal-notification").attr("src","/img/notificationNewVersion.svg");
            }
        }
        else if(version !== localStorage.whatsNew.whatsNewVersion){
            $("#whats-new-modal-notification").attr("src","/img/notificationNewVersion.svg");
            let whatsNew = { "whatsNewVersion": version, "didOpenWhatsNew": false};
            localStorage.setItem('whatsNew', JSON.stringify(whatsNew));
        }

        $('#exampleModalCenter').on('hidden.bs.modal', function () {
            let whatsNew = { "whatsNewVersion": version, "didOpenWhatsNew": true};
            localStorage.setItem('whatsNew', JSON.stringify(whatsNew));
        });
    }
    
    console.log(localStorage)
});


