function changeInstructionSelection(element){
    $(".content-row").addClass('hidden-row');
    let rowToShow = $(element).data('content');
    console.log(`#${rowToShow}`);
    $(`#${rowToShow}`).removeClass('hidden-row');
    $('.install-select-button').removeClass('kabanero-colored-button');
    $(element).addClass('kabanero-colored-button');
}