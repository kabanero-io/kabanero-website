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

function hideAllFeaturedModelsCollapses(element){
    $(".featuredModelsCollapse").collapse('hide');
    $(".featuredModelBox").removeClass('selectedStack');
    $(element).collapse('show');
    $(element).addClass('selectedStack');
}

function hideAllOpenSourcePlatformsCollapses(id){
    $(".open_source_platform_content_box").hide();
    $("#open_source_platform_" + id + "_collapse").show();
    $(".open_source_platform_box_selected").removeClass("open_source_platform_box_selected");
    $("#open_source_platform_" + id + "_box").addClass("open_source_platform_box_selected");
    $(".open_source_platform_vertical_separator_visible").removeClass("open_source_platform_vertical_separator_visible");
    $("#open_source_platform_" + id + "_separator").addClass("open_source_platform_vertical_separator_visible");
}