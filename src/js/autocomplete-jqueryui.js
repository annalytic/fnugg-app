/**
*
*   AUTOCOMPLETE.JS
*
*   Directly feeds response of ajax request to autocomplete source-parameter
*
**/

$('#search').autocomplete({
  // Source, type function.
  source: function(request, response) {
    $.ajax({
      url: "https://api.fnugg.no/suggest/autocomplete",
      dataType: "json",
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
