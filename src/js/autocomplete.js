/**
** AUTOCOMPLETE
**/

// Alt 1. Get complete list of ski resorts, put in list and send as param to jQuery UI Autocomlete.
// Get results that *contains* the typed letters

// function getNearbyResults() {
//   const listOfNearbyResults = [];
//   const autoCompleteAPI = 'https://api.fnugg.no/search?q=';
//   let autoCompleteOptions = {
//     size: 1000
//   };
//   function nearbyResults(data) {
//     $.each(data.hits.hits, function(i, result) {
//       listOfNearbyResults[i] = result._source.name;
//     });
//     $('#search').autocomplete({
//       source: listOfNearbyResults
//     });
//   }
//   $.getJSON(autoCompleteAPI, autoCompleteOptions, nearbyResults);
//   return listOfNearbyResults;
// }

// To run alt 1
// getNearbyResults();




// Alt 2. Using fnugg API for autocomplete only returns ski resort names that starts with the typed letters.
// Con. Many HTTP GET requests. But will not influence performance of website since it's async.

// function getNearbyResults() {
//   var listOfNearbyResults = [];
//   var autoCompleteAPI = 'https://api.fnugg.no/suggest/autocomplete';
//   var searchTerm = $('#search').val();
//   var autoCompleteOptions = {
//     q: searchTerm
//   };
//
//   function nearbyResults(data) {
//     $.each(data.result, function(i, result) {
//       listOfNearbyResults[i] = result.name;
//     });
//   }
//
//   // get jsondata
//   $.getJSON(autoCompleteAPI, autoCompleteOptions, nearbyResults);
//   return listOfNearbyResults;
// }

// $("#search").keypress(function(){
//   var listOfNearbyResults = getNearbyResults();
//   $(this).autocomplete({
//     source: 'https://api.fnugg.no/suggest/autocomplete',
//     delay: 500,
//     minLength: 3
//   });
// });



// Alt 3. Optimized. Directly feeds response of ajax request to autocomplete source-parameter
$('#search').autocomplete({
  // Source, type function.
  source: function(request, response) {
    $.ajax({
        url: "https://api.fnugg.no/suggest/autocomplete",
        dataType: "json",
        data: {
            q: $('#search').val()
        },
        success: function (data) {
          var listOfNearbyResults = [];
          $.each(data.result, function(i, result) {
            listOfNearbyResults[i] = result.name;
          });
          response(listOfNearbyResults);
        }
    });
  },
  // Adds delay of 500ms
  // delay: 500,
  // Min. no of letters before autocomplete makes suggestions
  minLength: 3,
  // Search the selection on selection/enter
  select: function(event, ui) {
    // $('#search').val(ui.item.value);
    $('form').submit();
  }
});

// Submit form when hitting enter
// $('#search').keypress(function (e) {
//   if (e.keyCode == 13) {
//     $('form').submit(function(e) {
//        e.preventDefault();
//        getInfo();
//     });
//   }
// });


// Run ajax on submit of form.
$('form').submit(function(e) {
   e.preventDefault();
   $('.welcome').fadeOut();
   // setTimeout(function() {
   //   getInfo();
   // }, 500);
   getInfo();
});
