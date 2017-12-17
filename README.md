# fnugg-app :snowflake:
## Oppgaven
Oppgaven er å lage en enkel app for å vise ski- og værforholdene på et bestemt skisenter. For å gjøre det skal vi bruke Fnugg API (https://api.fnugg.no/) for å finne skisentere i Norge. Vi kan enten presentere dataene direkte til brukerne eller så kan vi bruke Fnugg widget (https://www.fnugg.no/widget/resort).

Appen skal ha grunnleggende UX funksjonalitet for å finne skisentere. Den skal også være responsiv og kompatibel i alle moderne nettlesere.

## README.md
I denne filen vil jeg 

## Mappestruktur

```
api-case
  /dist
        app.js
        style.css
  /src
        /assets
        /js
            autocomplete-jqueryui.js
            autocomplete-vanillajs.js
            displayinfo.js
            displaywidget.js
            progressbar.js
            search.js
        /sass
            /base
                _normalize.scss
                _colors.scss
                _typography.scss
                all.scss
            /component
                _autocomplete.scss
                _resort.scss
                _search.scss
                _welcome.scss
                _widget.scss
                all.scss
            style.scss
  index.html
  package.json
```

### index.html
Hovedsiden for appen. Den inneholder html, head og body. I head er det en rekke metatagger. Metatagger inneholder viktig informasjon om HTML-dokumentet, som f.eks. encoding, beskrivelse og stikkord om nettstedet, forfatter og informasjon om nettleservinduet osv.
I head er det også inkludert flere stylesheets. Hovedstylesheetet heter *style.css*. Jeg har inkludert *jquery-ui.css* fordi jeg har tatt i bruk jQuery UI's autocomplete plugin.

I bodytaggen er det en formelement som holder på inputfelt for søk. Jeg tok i utgangspunktet med sumbitknapp også, men har kommentert ut denne. Les under "Design og UX" for hvorfor.

I divelementet med id *content* er det en div *welcome* som viser kort velkomsttekst og logoen til Fnugg. Etter et søk vil denne diven fjernes og erstattes med *resort-results* som viser resultatet av søket.

### dist

Javascript og CSS for hele prosjektet etter minifisering og konkatenering.

### src

#### assets: Alle bildefiler som logo og værsymboler hentet fra yr.no (http://om.yr.no/symbol/)

#### js

For å gjøre det lettere for meg selv og andre å lese og forstå javascriptkoden har jeg delt den opp i egne javascript-filer etter funksjonalitet. Jeg har forsøkt å gi dem selvforklarende filnavn.

##### autocomplete-jqueryui.js
Jeg har brukt jQuery UI's widget "autocomplete" til å presentere forslag basert på det brukeren skriver i søkefeltet. Widgetens parameter *source* kan ta imot en streng, array eller funksjon(forespørsel, respons). Jeg har brukt den siste varianten til å gjøre AJAX-forespørsel mot **Fnuggs Autocomplete API** (https://api.fnugg.no/suggest/autocomplete?q=). Fnuggs Autocomplete API fungerer på følgende måte: Dersom brukeren f.eks. skriver "Fje" så vil APIet returnere alle skisentere med navn som begynner med "Fje". Gå til https://api.fnugg.no/suggest/autocomplete?q=Fje for å se resultatet av forespørselen. Resultatet er i JSON-format. APIet inneholder informasjon om antall treff og navnet på skisenterne.

Basert på det brukeren skriver i søkefeltet gjøres en AJAX-forespørsel der navnet hentes ut og legges i en array. Denne array mates tilbake til autocomplete som viser denne til brukeren. Jeg har brukt jQuery for å gjøre AJAX-forespørselen. Fordelen med å bruke jQuery er at man ikke må håndtere eventuelle feil som kan resultere fra forspørselen. Dersom man gjør forespørselen med vanilla JS må man ta hensyn til det.

Autocompletes parameter *success* 

##### autocomplete-vanillajs.js

##### displayinfo.js

Basert 

##### displaywidget.js



#### sass

## Design og UX

## Verktøy

I dette prosjketet har jeg brukt npm til å konkatenere og minifisere javascript og sass.

## 
