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

$( document ).ready(function() {
    $(".filter").on("change", filterStacks);
    $(".stackTile").on("click", toggleStackTileCollapse);

    // Change stack imgs to colored version on mouseover and back to black on mouseout
    $(".tileImg").hover(el => $(el.target).attr("src",($(el.target).data("color-img"))),
        el => $(el.target).attr("src",($(el.target).data("black-img"))));
});

function filterStacks(){
    // Remove any existing info under stacks before filter
    $("#stackCollapse").remove();

    let selectedTags = $(".filter:checkbox:checked").map((index,filter) => $(filter).val()).get();

    // if no filter is selected show all tiles
    if(selectedTags.length === 0){
        $(".stackTile").each((index, tile) => {
            $(tile).show();
        });
        return;
    }

    $(".stackTile").each((index, tile) => {
        let currentTileTags = $(tile).data("tags").split(",");

        // filter out the tiles with tags that aren't included in the selected tag filters
        let tagMatches = currentTileTags.filter(tag => selectedTags.includes(tag.trim()));
        tagMatches.length > 0 ? $(tile).show() : $(tile).hide();
    });
}

function toggleStackTileCollapse(){
    //remove currently opened collapse if it exists
    $("#stackCollapse").remove();

    //if we clicked on a tile that has the collapse open already, then toggle it to closed and we're done
    if($(this).data('isSelected')){
        $(this).data('isSelected', false);
        return;
    }

    //figure out what row the element that got clicked on is in
    let tilesIndex = 0;
    let visibleTiles = $(".stackTile:visible");
    for(tilesIndex; tilesIndex < visibleTiles.length; tilesIndex++){
        if($(this).is(visibleTiles[tilesIndex])){
            break;
        }
    }
    let rowNumber = Math.floor(tilesIndex / 4);

    //Stack table uses rows of four with 0 indexing.  0th row ends with index 3, 1st ends with index 7, and so on
    let endOfRowIndex = 3 + (4 * rowNumber);

    //If the given row is not full, we have to back the append index up to a tile that exists so the insertAfter function will work
    let appendIndex = visibleTiles.length <= endOfRowIndex ? visibleTiles.length - 1 : endOfRowIndex;
    $(getStackCollapseHtml(this)).insertAfter(visibleTiles[appendIndex]);    
    let positionsFromEndOfRow = endOfRowIndex - tilesIndex;
    appendArrows(positionsFromEndOfRow);
    $(this).data('isSelected', true);
}

function getStackCollapseHtml(){
    //Once we get designs from design team, this will have to change to return the respective sets of images & text.  
    // For now, just return example html
    return `<div class="col card card-body" id="stackCollapse">
                <div class="arrowUpInner"></div>
                <div class="arrowUpOuter"></div>
                <div class="row collapseRow">
                    <div class="col-md-2 textAlignCenter">
                        <img src="/img/logos/85x85/helm.png" class="img-fluid">
                        <p>Helm</p>
                    </div>
                    <div class="col-md-2 textAlignCenter">
                        <img src="/img/logos/85x85/kubernetes.png" class="img-fluid">
                        <p>Kubernetes</p>
                    </div>
                    <div class="col-md-2 textAlignCenter">
                        <img src="/img/logos/85x85/prometheus.png" class="img-fluid">
                        <p>Prometheus</p>
                    </div>
                    <div class="col-md-2 textAlignCenter">
                        <img src="/img/logos/85x85/open_liberty.png" class="img-fluid">
                        <p>Open Liberty</p>
                    </div>
                    <div class="col-md-2 textAlignCenter">
                        <img src="/img/logos/85x85/EclipseChe.png" class="img-fluid">
                        <p>Eclipse Che</p>
                    </div>
                    <div class="col-md-2 textAlignCenter">
                        <img src="/img/logos/85x85/tekton.png" class="img-fluid">
                        <p>Tekton</p></div></div><div class="row">
                    <div class="col">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                            exercitation ullamco laboris.
                        </p>
                    </div>
                </div>
            </div>`;
}

function appendArrows(tilePosition){
    if(tilePosition === 0){
        $(".arrowUpInner").addClass("rightTileArrow");
        $(".arrowUpOuter").addClass("rightTileArrow");
    }else if(tilePosition === 1){
        $(".arrowUpInner").addClass("rightCenterTileArrow");
        $(".arrowUpOuter").addClass("rightCenterTileArrow");
    }else if(tilePosition === 2){
        $(".arrowUpInner").addClass("leftCenterTileArrow");
        $(".arrowUpOuter").addClass("leftCenterTileArrow");
    }else if(tilePosition === 3){
        $(".arrowUpInner").addClass("leftTileArrow");
        $(".arrowUpOuter").addClass("leftTileArrow");
    }
}