function changeInstructionSelection(){
    $('.content-row').hide();

    let rowIDToShow = $(this).data('content');
    $(`#${rowIDToShow}`).show();

    $('.install-select-button').removeClass('kabanero-colored-button');
    $(this).addClass('kabanero-colored-button');
}

$(document).ready(function() {
    $('.install-select-button').on('click', changeInstructionSelection);
});
