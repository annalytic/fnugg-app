/**
*   AUTOCOMPLETE-JQUERYUI.JS
*
*   Uses jQuery UI's "Autocomplete".
*   Directly feeds response of AJAX request to autocompletes "source" parameter.
**/

const autocompleteJUI = $('#search').autocomplete({
  source: function(request, response) {
    $.ajax({
      // URL to send the request to
      url: "https://api.fnugg.no/suggest/autocomplete",

      // Datatype expected from the server response
      dataType: "json",

      // Data to be sent to the server. In our case this is the value of the input field.
      data: {
          q: $('#search').val()
      },
      // When AJAX call is successful
      success: function (data) {
        let listOfNearbyResults = [];

        // For each object in the response get the value of the key "name" and store it in listOfNearbyResults.
        $.each(data.result, function(i, result) {
          listOfNearbyResults[i] = result.name;
        });

        response(listOfNearbyResults);
      },
      // When AJAX call has failed
      error: function(textStaus, errorThrown) {
        console.log(textStatus + ': ' + errorThrown);
      }
    });
  },
  // Min. no of letters before we start generating suggestions
  minLength: 2,
  // Autofocus on first in list
  autoFocus: true,
  // Search the selection on selection/enter
  select: function(event, ui) {
    $('#search').val(ui.item.value);
    $('form').submit();
    ui.addEventListener('touchend', function() {
      $('form').submit();
    });
  }
});

// Closes suggestion menu and prevents default on keypress "enter"
autocompleteJUI.keypress(function (e) {
  if(e.keyCode === 13) {
    e.preventDefault();
    $(".ui-menu").hide();
    return false;
  }
});
