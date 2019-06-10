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

$(document).ready(function(){
    // Check if the QA site or Dev site is loaded and add a flag to the header 
    var host = window.location.hostname;
    var label;
    if(host.indexOf('qa-guides') > -1 || host.indexOf('draft-kabaneroio') > -1){
        label = $("<div></div>");
        label.addClass('qa-descriptor');
        label.text('QA Site');
        $(".navbar").after(label);
    } else if(host.indexOf('kabanerodev') > -1){
        label = $("<div></div>");
        label.addClass('qa-descriptor');
        label.text('Dev Site');
        $(".navbar").after(label);
    }
});
