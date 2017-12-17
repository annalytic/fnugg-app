/**
*   AUTOCOMPLETE-JQUERYUI.JS
*
*   Uses jQuery UI's "Autocomplete".
*   (To see the partial working solution solved with Vanilla JS go to autocomplete-vanillajs.js)

*   Directly feeds response of AJAX request to autocompletes "source" parameter
**/

$('#search').autocomplete({

  /*
  Our SOURCE type is a function that gets two arguments, a "request" object,
  which refers to the value in the text input and a "response" callback that excepts the data to
  suggest to the user.
  */

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

      /*
      Callback function for sucessful AJAX request.
      This callback function gets the names of the ski resorts Fnuggs autocomplete API
      returns based on the inputted word/letters from user, and puts them in a array.
      This array is then given back to autocomplete to list out as suggested search terms.
      */

      success: function (data) {
        var listOfNearbyResults = [];
        // For each object in the response get the value of the key "name" and store it in listOfNearbyResults.
        $.each(data.result, function(i, result) {
          listOfNearbyResults[i] = result.name;
        });
        response(listOfNearbyResults);
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
  }
  // Closes suggestion menu on keypress "enter"
  }).keyup(function (e) {
    if(e.keyCode === 13) {
        $(".ui-menu").hide();
    }
  });
