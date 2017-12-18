function displayInfo(){var s=$("#search").val(),e={q:s};$.getJSON("https://api.fnugg.no/search?sourceFields=name,urls,conditions,lifts,slopes",e,function(e){$(".content").empty(),$(".content").append('<div class="resort-results"></div>'),$(".resort-results").append('<span class="searched-for">Du søkte på: <strong>'+s+"</strong></span>"),$(".resort-results").append('<div class="resort-logo"><a href="/"><img src="../src/assets/img/logo/logo.svg" xmlns="http://www.w3.org/2000/svg"/></a></div>');var t=e.hits.hits[0];$(".resort-results").append('<div class="resort-results-block resort-results-block"></div>'),$(".resort-results-block").append('<div class="resort-row resort-name"><a href="'+t._source.urls.homepage+'">'+t._source.name+"</a></div>"),$(".resort-results-block").append('<div class="resort-row resort-condition"><span>'+t._source.conditions.combined.top.condition_description+"</span><span>"+t._source.conditions.combined.top.last_updated+"</span></div>"),$(".resort-results-block").append('<div class="resort-stats resort-stats"></div>'),$(".resort-stats").append('<div class="resort-stats-column resort-stats-weather"><img src="../src/assets/img/weather-icons/png/'+t._source.conditions.combined.top.symbol.yr_id+'.png"><span>'+t._source.conditions.combined.top.symbol.name+"</span></div>"),$(".resort-stats").append('<div class="resort-stats-column resort-temp-wind"><div class="resort-temp-wind__temp">'+t._source.conditions.combined.top.temperature.value+'&#176;</div><div class="resort-temp-wind__wind"><div class="resort-temp-wind__arrow"><svg width="22" height="22" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M15.955 26.89c.056.16.284.16.34 0l7.71-21.883c.058-.164-.127-.306-.27-.207l-7.508 5.072c-.06.04-.142.04-.203 0L8.517 4.8c-.144-.1-.33.043-.272.207l7.71 21.882z" stroke="#FFF" stroke-width="1" fill="none" fill-rule="evenodd"></path></svg></div>'+t._source.conditions.combined.top.wind.mps+"m/s</div></div>");var r=t._source.lifts.open/t._source.lifts.count,o=t._source.slopes.open/t._source.slopes.count;$(".resort-stats").append('<div class="resort-stats-column resort-lifts-slopes"><span class="resort-lifts-slopes__headline">Heiser åpne</span><div class="resort-slopes-lifts-row"><span class="resort-lifts-slopes__ratio">'+t._source.lifts.open+"/"+t._source.lifts.count+'</span><div class="resort-lifts-slopes__no"><span class="no">'+t._source.lifts.open+'</span></div><span class="resort-lifts-slopes__percentage">'+Math.round(100*r)+"%</span></div></div>"),$(".resort-stats").append('<div class="resort-stats-column resort-lifts-slopes"><span class="resort-lifts-slopes__headline">Åpne nedfarter</span><div class="resort-lifts-slopes-row"><span class="resort-lifts-slopes__ratio">'+t._source.slopes.open+"/"+t._source.slopes.count+'</span><div class="resort-lifts-slopes__no"><span class="no">'+t._source.slopes.open+'</span></div><span class="resort-lifts-slopes__percentage">'+Math.round(100*o)+"%</span></div></div>"),progressBar(r,o),$(".resort-stats").append('<div class="resort-stats-column resort-snow-depth"><div class="resort-snow-depth__row"><span>I løype</span><span class="depth">'+t._source.conditions.combined.top.snow.depth_slope+'</span>cm</div><div class="resort-snow-depth__row"><span>I terreng</span><span class="depth">'+t._source.conditions.combined.top.snow.depth_terrain+"</span>cm</div></div>"),$(".resort-results").append('<p class="credit">Vær- og snøinformasjon er levert i samarbeid med yr.no og Meterologisk institutt i tillegg til anleggens egen rapportering')})}function displayWidget(){var s=$("#search").val(),e={q:s};$.getJSON("https://api.fnugg.no/search?sourceFields=id",e,function(e){var t;$(".content").empty(),$(".content").append('<div class="resort-results"></div>'),$(".resort-results").append('<span class="searched-for">Du søkte på: <strong>'+s+"</strong></span>"),t=e.hits.hits[0]._source.id,$(".resort-results").append('<iframe class="widget" src="https://www.fnugg.no/widget/resort/?id='+t+'"></iframe>')})}function createCanvas(s){var e=document.createElement("canvas");e.setAttribute("height","80"),e.setAttribute("width","80");var t=e.getContext("2d"),r=e.width/2,o=e.height/2;return t.beginPath(),t.arc(r,o,25,1.5*Math.PI,(1.5+2*s)*Math.PI,!1),t.fillStyle="transparent",t.fill(),t.lineWidth=4,t.strokeStyle="#07A1C4",t.stroke(),e}function progressBar(s,e){var t=document.getElementsByClassName("resort-lifts-slopes__no"),r=createCanvas(s);t[0].appendChild(r);var o=createCanvas(e);t[1].appendChild(o)}$("form").submit(function(s){s.preventDefault(),$("#welcome").remove(),displayInfo()}),$("#search").keydown(function(s){if(13==s.keyCode)return s.preventDefault(),!1});