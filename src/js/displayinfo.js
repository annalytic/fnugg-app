/**
*   DISPLAYINFO.JS
*
*   Displays info about specific ski resort on page based on name of ski resort.
**/

function displayInfo() {

  var fnuggAPI = 'https://api.fnugg.no/search?sourceFields=name,urls,conditions,lifts,slopes';
  var searchTerm = $('#search').val();
  var fnuggOptions = {
    q: searchTerm
  };

  function printInfo2(data) {
    $('.content').empty();
    $('.content').append('<div class="resort-results"></div>');
    $('.resort-results').append('<span class="searched-for">Du s&oslash;kte p&aring;: <strong>' + searchTerm + '</strong></span>');
    $('.resort-results').append('<div class="resort-logo"><a href="/"><img src="src/assets/img/logo/logo.svg" xmlns="http://www.w3.org/2000/svg"/></a></div>');

    /*
    Since we want to only display the first result even if the AJAX-requests returns several responses, we have to get the first in the array.
    If want to display all responses, replace with: $.each(data.hits.hits, function(i, info) {}
    */

    var info = data.hits.hits[0];

    $('.resort-results').append('<div class="resort-results-block resort-results-block"></div>');

    // Resort name
    $('.resort-results-block').append('<div class="resort-row resort-name"><a href="' + info._source.urls.homepage + '">' + info._source.name + '</a></div>');

    // Resort condition
    $('.resort-results-block').append('<div class="resort-row resort-condition">'
    + '<span>' + info._source.conditions.combined.top.condition_description + '</span>' + '<span>Sist oppdatert: ' + info._source.conditions.combined.top.last_updated + '</span>' + '</div>');

    // RESORT STATS
    $('.resort-results-block').append('<div class="resort-stats resort-stats"></div>');

    // Column: Weather symbol
    $('.resort-stats').append('<div class="resort-stats-column resort-stats-weather">'
    + '<img src="src/assets/img/weather-icons/svg/' + info._source.conditions.combined.top.symbol.yr_id + '.svg" xmlns="http://www.w3.org/2000/svg">'
    + '<span>' + info._source.conditions.combined.top.symbol.name + '</span>'
    + '</div>');

    // Column: Temp and wind
    $('.resort-stats').append('<div class="resort-stats-column resort-temp-wind"><div class="resort-temp-wind__temp">'
    + info._source.conditions.combined.top.temperature.value + '&#176;</div>'
    + '<div class="resort-temp-wind__wind">'
    + '<div class="resort-temp-wind__arrow"><svg width="22" height="22" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M15.955 26.89c.056.16.284.16.34 0l7.71-21.883c.058-.164-.127-.306-.27-.207l-7.508 5.072c-.06.04-.142.04-.203 0L8.517 4.8c-.144-.1-.33.043-.272.207l7.71 21.882z" stroke="#FFF" stroke-width="1" fill="none" fill-rule="evenodd"></path></svg></div>'
    + info._source.conditions.combined.top.wind.mps + 'm/s' + '</div></div>');

    var ratioLifts = info._source.lifts.open/info._source.lifts.count;
    var ratioSlopes = info._source.slopes.open/info._source.slopes.count;

    // Column: Lifts
    $('.resort-stats').append('<div class="resort-stats-column resort-lifts-slopes"><span class="resort-lifts-slopes__headline">Heiser &aring;pne</span>'
    + '<div class="resort-slopes-lifts-row"><span class="resort-lifts-slopes__ratio">'
    + info._source.lifts.open + '/' + info._source.lifts.count + '</span>'
    + '<div class="resort-lifts-slopes__no">' + '<span class="no">' + info._source.lifts.open + '</span>' + '</div>'
    + '<span class="resort-lifts-slopes__percentage">' + Math.round(ratioLifts*100)
    + '%' + '</span></div>' + '</div>');

    // Column: Slopes
    $('.resort-stats').append('<div class="resort-stats-column resort-lifts-slopes"><span class="resort-lifts-slopes__headline">&Aring;pne nedfarter</span>'
    + '<div class="resort-lifts-slopes-row"><span class="resort-lifts-slopes__ratio">'
    + info._source.slopes.open + '/' + info._source.slopes.count + '</span>'
    + '<div class="resort-lifts-slopes__no">' + '<span class="no">' + info._source.slopes.open + '</span>' + '</div>'
    + '<span class="resort-lifts-slopes__percentage">' + Math.round(ratioSlopes*100)
    + '%' + '</span></div>' + '</div>');

    progressBar(ratioLifts, ratioSlopes);

    // Column: Snow depth
    $('.resort-stats').append('<div class="resort-stats-column resort-snow-depth">'
    + '<div class="resort-snow-depth__row"><span>I l&oslash;ype</span>' + '<span class="depth">' + info._source.conditions.combined.top.snow.depth_slope + '</span>'+'cm'+'</div>'
    + '<div class="resort-snow-depth__row"><span>I terreng</span>' + '<span class="depth">' + info._source.conditions.combined.top.snow.depth_terrain + '</span>'+'cm'+'</div>'
    + '</div>');

    // Credits
    $('.resort-results').append('<p class="credit">Vær- og sn&oslash;informasjon er levert i samarbeid med yr.no og Meterologisk institutt i tillegg til anleggens egen rapportering');
  }

  $.getJSON(fnuggAPI, fnuggOptions, printInfo2);
}
