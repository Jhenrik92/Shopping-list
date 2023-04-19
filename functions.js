
$('#openButtonGrønt').click(function () { 
    $('#grønt').animate({
        height: 200, // expands the div
    }, 'fast');
    $('#openButtonGrønt').css('visibility', 'hidden'); // hides the button which expands div
    $('#addItemGrønt').css('visibility', 'visible'); // shows the input field when div expands
    $('#closeButtonGrønt').css('visibility', 'visible'); // shows button to resize div back to normal
});

$('#closeButtonGrønt').click(function () { // button which resize div back to normal
    $('#grønt').animate({
        height: 59.5,
    }, 'fast');
    $('#closeButtonGrønt').css('visibility', 'hidden'); // hides close-button
    $('#addItemGrønt').css('visibility', 'hidden'); // hides input field
    $('#openButtonGrønt').css('visibility', 'visible'); // shows button which expands div
});

// -----------

$('#openButtonMeieri').click(function () {
    $('#meieri').animate({
        height: 200,
    }, 'fast');
    $('#openButtonMeieri').css('visibility', 'hidden');
    $('#addItemMeieri').css('visibility', 'visible');
    $('#closeButtonMeieri').css('visibility', 'visible');
});

$('#closeButtonMeieri').click(function () {
    $('#meieri').animate({
        height: 59.5,
    }, 'fast');
    $('#closeButtonMeieri').css('visibility', 'hidden');
    $('#addItemMeieri').css('visibility', 'hidden');
    $('#openButtonMeieri').css('visibility', 'visible');
});

// -----------

$('#openButtonBake').click(function () {
    $('#bakevarer').animate({
        height: 200,
    }, 'fast');
    $('#openButtonBake').css('visibility', 'hidden');
    $('#addItemBake').css('visibility', 'visible');
    $('#closeButtonBake').css('visibility', 'visible');
});

$('#closeButtonBake').click(function () {
    $('#bakevarer').animate({
        height: 59.5,
    }, 'fast');
    $('#closeButtonBake').css('visibility', 'hidden');
    $('#addItemBake').css('visibility', 'hidden');
    $('#openButtonBake').css('visibility', 'visible');
});

// -----------

$('#openButtonTørr').click(function () {
    $('#tørrvarer').animate({
        height: 200,
    }, 'fast');
    $('#openButtonTørr').css('visibility', 'hidden');
    $('#addItemTørr').css('visibility', 'visible');
    $('#closeButtonTørr').css('visibility', 'visible');
});

$('#closeButtonTørr').click(function () {
    $('#tørrvarer').animate({
        height: 59.5,
    }, 'fast');
    $('#closeButtonTørr').css('visibility', 'hidden');
    $('#addItemTørr').css('visibility', 'hidden');
    $('#openButtonTørr').css('visibility', 'visible');
});

// -----------

$('#openButtonFryse').click(function () {
    $('#frysevarer').animate({
        height: 200,
    }, 'fast');
    $('#openButtonFryse').css('visibility', 'hidden');
    $('#addItemFryse').css('visibility', 'visible');
    $('#closeButtonFryse').css('visibility', 'visible');
});

$('#closeButtonFryse').click(function () {
    $('#frysevarer').animate({
        height: 59.5,
    }, 'fast');
    $('#closeButtonFryse').css('visibility', 'hidden');
    $('#addItemFryse').css('visibility', 'hidden');
    $('#openButtonFryse').css('visibility', 'visible');
});

// -----------

$('#openButtonHus').click(function () {
    $('#husholdning').animate({
        height: 200,
    }, 'fast');
    $('#openButtonHus').css('visibility', 'hidden');
    $('#addItemHus').css('visibility', 'visible');
    $('#closeButtonHus').css('visibility', 'visible');
});

$('#closeButtonHus').click(function () {
    $('#husholdning').animate({
        height: 59.5,
    }, 'fast');
    $('#closeButtonHus').css('visibility', 'hidden');
    $('#addItemHus').css('visibility', 'hidden');
    $('#openButtonHus').css('visibility', 'visible');
});

// -----------

$('#openButtonHygiene').click(function () {
    $('#hygiene').animate({
        height: 200,
    }, 'fast');
    $('#openButtonHygiene').css('visibility', 'hidden');
    $('#addItemHygiene').css('visibility', 'visible');
    $('#closeButtonHygiene').css('visibility', 'visible');
});

$('#closeButtonHygiene').click(function () {
    $('#hygiene').animate({
        height: 59.5,
    }, 'fast');
    $('#closeButtonHygiene').css('visibility', 'hidden');
    $('#addItemHygiene').css('visibility', 'hidden');
    $('#openButtonHygiene').css('visibility', 'visible');
});

// -----------

$('#openButtonAnnet').click(function () {
    $('#annet').animate({
        height: 200,
    }, 'fast');
    $('#openButtonAnnet').css('visibility', 'hidden');
    $('#addItemAnnet').css('visibility', 'visible');
    $('#closeButtonAnnet').css('visibility', 'visible');
});

$('#closeButtonAnnet').click(function () {
    $('#annet').animate({
        height: 59.5,
    }, 'fast');
    $('#closeButtonAnnet').css('visibility', 'hidden');
    $('#addItemAnnet').css('visibility', 'hidden');
    $('#openButtonAnnet').css('visibility', 'visible');
});




function makeSelected(itemCountNumber) {
    $("#item" + itemCountNumber).css('background-color', 'rgb(60, 179, 113)');
}

function deleteItem(itemCountNumber) {
    $("#item" + itemCountNumber).remove();
}


let itemCount = 0; // adding a unique number at the end of all buttons ID
// the counter variable is global so that all input fields can reach it

$('#inputGrønt').keypress(function (keyPressEvent) {
    let key = keyPressEvent.which; // gets the value of the pressed keyboard key
    if (key == 13) { // 13 = Enter
        let add = $('#inputGrønt').val(); // the variable holds the input value
        if(add == '') { // if value is nothing, return nothing
            return;
        } else { // if value is something, return this:

        // THIS DID NOT WORK, ALL ELEMENTS NEED UNIQUE ID OR CLASSES:
        // $('#grøntList').append(<button class="addedItem"></button>)
        // $('.addedItem).html(add);

            itemCount++; // increment number for each new button

            // creating a new button with the id "item" + the incrementing number. 
            // adding same class on every button to be able to delete all at once.
            // onclick executes functions which 1. adds color to button, 2. remove button.
            // current value in variable "add" is added to the button.
            $('#grøntList').append('<button id="item' + itemCount + '"' 
            + 'class="addedItem" onclick="makeSelected(' + itemCount + ')"'
            + 'ondblclick="deleteItem(' + itemCount + ')">' + add + '</button>');

            $('#inputGrønt').val('');
        }        
    }
});

// -----------

$('#inputMeieri').keypress(function (keyPressEvent) {
    let key = keyPressEvent.which;
    if (key == 13) { 
        let add = $('#inputMeieri').val();
        if(add == '') { 
            return;
        } else {
            itemCount++;

            $('#meieriList').append('<button id="item' + itemCount + '"' 
            + 'class="addedItem" onclick="makeSelected(' + itemCount + ')"'
            + 'ondblclick="deleteItem(' + itemCount + ')">' + add + '</button>');

            $('#inputMeieri').val('');
        }        
    }
});

// -----------

$('#inputBake').keypress(function (keyPressEvent) {
    let key = keyPressEvent.which;
    if (key == 13) { 
        let add = $('#inputBake').val();
        if(add == '') { 
            return;
        } else {
            itemCount++;

            $('#bakeList').append('<button id="item' + itemCount + '"' 
            + 'class="addedItem" onclick="makeSelected(' + itemCount + ')"'
            + 'ondblclick="deleteItem(' + itemCount + ')">' + add + '</button>');

            $('#inputBake').val('');
        }        
    }
});

// -----------

$('#inputTørr').keypress(function (keyPressEvent) {
    let key = keyPressEvent.which;
    if (key == 13) { 
        let add = $('#inputTørr').val();
        if(add == '') { 
            return;
        } else {
            itemCount++;

            $('#tørrList').append('<button id="item' + itemCount + '"' 
            + 'class="addedItem" onclick="makeSelected(' + itemCount + ')"'
            + 'ondblclick="deleteItem(' + itemCount + ')">' + add + '</button>');

            $('#inputTørr').val('');
        }        
    }
});

// -----------

$('#inputFryse').keypress(function (keyPressEvent) {
    let key = keyPressEvent.which;
    if (key == 13) { 
        let add = $('#inputFryse').val();
        if(add == '') { 
            return;
        } else {
            itemCount++;

            $('#fryseList').append('<button id="item' + itemCount + '"' 
            + 'class="addedItem" onclick="makeSelected(' + itemCount + ')"'
            + 'ondblclick="deleteItem(' + itemCount + ')">' + add + '</button>');

            $('#inputFryse').val('');
        }        
    }
});

// -----------

$('#inputHus').keypress(function (keyPressEvent) {
    let key = keyPressEvent.which;
    if (key == 13) { 
        let add = $('#inputHus').val();
        if(add == '') { 
            return;
        } else {
            itemCount++;

            $('#husList').append('<button id="item' + itemCount + '"' 
            + 'class="addedItem" onclick="makeSelected(' + itemCount + ')"'
            + 'ondblclick="deleteItem(' + itemCount + ')">' + add + '</button>');

            $('#inputHus').val('');
        }        
    }
});

// -----------

$('#inputHygiene').keypress(function (keyPressEvent) {
    let key = keyPressEvent.which;
    if (key == 13) { 
        let add = $('#inputHygiene').val();
        if(add == '') { 
            return;
        } else {
            itemCount++;

            $('#hygieneList').append('<button id="item' + itemCount + '"' 
            + 'class="addedItem" onclick="makeSelected(' + itemCount + ')"'
            + 'ondblclick="deleteItem(' + itemCount + ')">' + add + '</button>');

            $('#inputHygiene').val('');
        }        
    }
});

// -----------

$('#inputAnnet').keypress(function (keyPressEvent) {
    let key = keyPressEvent.which;
    if (key == 13) { 
        let add = $('#inputAnnet').val();
        if(add == '') { 
            return;
        } else {
            itemCount++;

            $('#annetList').append('<button id="item' + itemCount + '"' 
            + 'class="addedItem" onclick="makeSelected(' + itemCount + ')"'
            + 'ondblclick="deleteItem(' + itemCount + ')">' + add + '</button>');

            $('#inputAnnet').val('');
        }        
    }
});

// -----------


// Deletes all buttons at once.
$('#trashButton').click(function (){
    let ask = confirm('Vil du fjerne alle varene?')
    if(ask == true)
    $('.addedItem').remove();
})
