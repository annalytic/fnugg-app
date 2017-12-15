/**
** GET INFO
**/

function getInfo() {

  var fnuggAPI = 'https://api.fnugg.no/search';
  var searchTerm = $('#search').val();
  var fnuggOptions = {
    q: searchTerm
  };
  function displayInfo(data) {
    var infoHTML = '<div class="resort-result">';

    // Logo
    infoHTML += '<div class="resort__logo"><img class="logo" src="../src/assets/img/logo.svg" /></div>'
    $.each(data.hits.hits, function(i, info) {

      // Name
      infoHTML += '<div class="resort-row resort__name">' + info._source.name + '</div>';

      // Condition
      infoHTML += '<div class="resort-row resort__condition">'
      + info._source.conditions.combined.top.condition_description + '</div>';

      infoHTML += '<div class="resort-stats">';

      // Column: Weather symbol
      infoHTML += '<div class="resort-column resort-condition"><div class="resort-conditions__weather">'
      + info._source.conditions.combined.top.symbol.name + '</div></div>';

      // Column: Weather temp and wind
      infoHTML += '<div class="resort-column resort-temp-wind"><div class="resort-temp-wind__temp">'
      + info._source.conditions.combined.top.temperature.value + '&#176;'
      + '</div><div class="resort-temp-wind_wind">' + info._source.conditions.combined.top.wind.mps
      + 'm/s' + '</div></div>';

      // Column: Lifts
      infoHTML += '<div class="resort-column resort-lifts-slopes"><span class="resort-lifts-slopes__headline">Heiser åpne</span>'
      + '<div class="resort-slopes-lifts-row"><span class="resort-lifts-slopes__ratio">'
      + info._source.lifts.open + '/' + info._source.lifts.count + '</span>'
      + '<div class="resort-lifts-slopes__no">' + info._source.lifts.open + '</div>'
      + '<span class="resort-lifts-slopes__percentage">' + Math.round(info._source.lifts.open/info._source.lifts.count*100)
      + '%' + '</span></div>' + '</div>';

      // Column: Slopes
      infoHTML += '<div class="resort-column resort-lifts-slopes"><span class="resort-lifts-slopes__headline">Åpne nedfarter</span>'
      + '<div class="resort-lifts-slopes-row"><span class="resort-lifts-slopes__ratio">'
      + info._source.slopes.open + '/' + info._source.slopes.count + '</span>'
      + '<div class="resort-lifts-slopes__no">' + info._source.slopes.open + '</div>'
      + '<span class="resort-lifts-slopes__percentage">' + Math.round(info._source.slopes.open/info._source.slopes.count*100)
      + '%' + '</span></div>' + '</div>';

      // infoHTML += '<li>Åpne nedfarter: ' + info._source.slopes.open + ' (' + info._source.slopes.open + '/' + info._source.slopes.count + ') ' + Math.round((info._source.slopes.open/info._source.slopes.count*100)) + '%' + '</li>';

      // // Snøforhold
      // infoHTML += '<h2>Snøforhold</h2>';
      // infoHTML += '<li>I løype: ' + info._source.conditions.combined.top.snow.depth_slope + info._source.conditions.combined.top.snow.unit + '</li>';
      // infoHTML += '<li>I terreng: ' + info._source.conditions.combined.top.snow.depth_terrain + info._source.conditions.combined.top.snow.unit + '</li>';
      //
      //
      // infoHTML += '<li>Sist oppdatert: ' + info._source.conditions.combined.top.last_updated + '</li>';
      infoHTML += '</div>';
    });
    infoHTML += '</div>';
    $('#content').html(infoHTML);
  }
  $.getJSON(fnuggAPI, fnuggOptions, displayInfo);
}
