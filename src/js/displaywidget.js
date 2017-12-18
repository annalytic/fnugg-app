/**
*   DISPLAYWIDGET.JS
*
*   Uses Fnuggs Widget to display conditions for a specific ski resorts.
*   Based on what the user searches for the function printWidget retrives the widget
*   based on id, and displays it in a iframe.
**/

function displayWidget() {

  var fnuggAPI = 'https://api.fnugg.no/search?sourceFields=id';
  var searchTerm = $('#search').val();
  var fnuggOptions = {
    q: searchTerm
  };

  function printWidget(data) {
    var id;
    $('.content').empty();
    $('.content').append('<div class="resort-results"></div>');
    $('.resort-results').append('<span class="searched-for">Du søkte på: <strong>' + searchTerm + '</strong></span>');

    var info = data.hits.hits[0];
    id = info._source.id;
    $('.resort-results').append('<iframe class="widget" src="'+ 'https://www.fnugg.no/widget/resort/?id=' + id + '"></iframe>');

  }

  $.getJSON(fnuggAPI, fnuggOptions, printWidget);
}
