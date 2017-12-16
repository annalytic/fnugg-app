/**
*
*   DISPLAYWIDGET.JS
*
*   Desc
*
**/

function displayWidget() {

  var fnuggAPI = 'https://api.fnugg.no/search';
  var searchTerm = $('#search').val();
  var fnuggOptions = {
    q: searchTerm
  };

  function printWidget(data) {
    var id;
    $('.content').empty();
    $('.content').append('<div class="resort-results"></div>');
    $('.resort-results').append('<span class="searched-for">Du søkte på: <strong>' + searchTerm + '</strong></span>');

    $.each(data.hits.hits, function(i, info) {
      id = info._source.id;
      $('.resort-results').append('<iframe class="widget" src="'+ 'https://www.fnugg.no/widget/resort/?id=' + id + '"></iframe>')
    });
  }

  $.getJSON(fnuggAPI, fnuggOptions, printWidget);
}
