# fnugg-app :snowflake:
## Oppgaven
Oppgaven går ut på å lage en enkel app for å vise ski- og værforholdene for et bestemt skisenter i Norge. Vi skal bruke Fnugg.nos API (https://api.fnugg.no/) for å hente data fra de forskjellige skisenterne. Datene kan enten presenteres direkte til brukerne eller vi kan bruke Fnugg widget (https://www.fnugg.no/widget/resort).

Appen skal ha grunnleggende UX-funksjonalitet for å finne skisentere. Den skal være responsiv og kompatibel med alle moderne nettlesere.

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
Hovedsiden for appen. Den inneholder `html`, `head` og `body`. I `head` er det en rekke metatagger. Metatagger inneholder viktig informasjon om HTML-dokumentet, som f.eks. encoding, beskrivelse, forfatter og informasjon om nettleservinduet.
I `head` er det inkludert flere stylesheets. Hovedstylesheetet heter `style.css`. Jeg har inkludert `jquery-ui.css` fordi jeg har tatt i bruk jQuery UI's Autocomplete widget.

I body-taggen er det et `form`-element som holder på et `input`-felt for søk. Jeg tok i utgangspunktet med `sumbit`-knapp også, men har kommentert ut denne. Les under "Design og UX" for hvorfor.

I div-elementet med id `content` er det en div `welcome` som viser en kort velkomsttekst og logoen til Fnugg. Ved et søk vil denne div'en fjernes og erstattes med `resort-results` som viser resultatet av søket.

### /dist

Javascript og CSS for hele prosjektet etter minifisering og konkatenering.

### /src

#### /assets
Inneholder logo hentet fra http://fnugg.no og værsymboler hentet fra yr.no (http://om.yr.no/symbol/)

#### /js

For å gjøre det lettere for andre og meg selv å lese og forstå javascript-koden har jeg delt den opp i separate javascript-filer etter funksjonalitet. Jeg har forsøkt å gi dem selvforklarende filnavn.

##### autocomplete-jqueryui.js
Jeg har brukt jQuery UI's widget **Autocomplete** til å presentere forslag basert på det brukeren skriver i søkefeltet. Widgetens parameter `source` kan ta imot en streng, array eller funksjon(forespørsel, respons). Jeg har brukt den siste varianten til å utføre AJAX-forespørsel mot **Fnuggs Autocomplete API** (https://api.fnugg.no/suggest/autocomplete?q=).

Fnuggs Autocomplete API fungerer på følgende måte: Si brukeren f.eks. skriver *"Fje"*, så vil APIet returnere alle skisentere med navn som begynner på *"Fje"* (Gå til https://api.fnugg.no/suggest/autocomplete?q=Fje for å se resultatet av denne forespørselen). Resultatet er i JSON-format.

Resultatet for hvert skisenter inneholder masse informasjon om senteret som jeg ikke trenger. For å kun hente ut relevant data har jeg lagt ved disse variablene i forespørselen: `?sourceFields=name,urls,conditions`. Resultatet gir oss antall treff, navn, og site-path for hvert skisenter. Men ikke noe id! Med id kunne jeg ha gjort søketresultatet enda mer presist enn det det er nå. Les mer om dette i `displayinfo.js`.

Basert på det brukeren skriver i søkefeltet utføres en AJAX-forespørsel der navnet på skisenterne hentes ut og legges i en array. Denne arrayen mates så tilbake til autocomplete som viser listen til brukeren. Jeg har brukt jQuery for å gjøre AJAX-forespørselen. Fordelen med å bruke jQuery er at man ikke må håndtere eventuelle HTTP-feil som kan resultere fra forspørselen.

Autocompletes parameter `success` håndterer det som skjer etter brukeren har valgt et av alternativene. Når brukeren har valgt et alternativ forteller vi autocomplete at formularet skal sendes ved å si `$('form').submit()`. Filen `search.js` tar seg av det som skjer når formularet sendes. 

##### autocomplete-vanillajs.js
Før jeg bestemte meg for å bruke jQuery UI's autocomplete forsøkte jeg meg på å lage min egen autocomplete i vanilla js. Selv om jeg ikke endte opp med å gå for den delvis fungerende løsningen valgte jeg likevel å ha den med her. Jeg bruker HTML5 `datalist`-element for å presentere foreslåtte søkeresultater. Årsaken til hvorfor jeg valgte å gå bort fra løsningen er i hovedsak pga. den dårlige støtten, samt manglene rundt events for `options`-elementene. Uten å kunne binde en handling til når brukeren velger et av alternativene, må brukeren nå trykke enter to ganger eller først velge alternativ med musepekeren også trykke enter for å sende forespørselen.

Her for å se løsningen:


##### search.js
Denne filen håndterer det som skjer når formularet sendes. Vi ønsker nemlig ikke at formularet skal sendes, men å vise frem resultatet av skisenteret brukeren søker på. For å få til det har vi sagt `event.preventDefault()` som hindrer formularet i å utføre standard handling, og ber den om å kjøre funksjonen `displayInfo()` istedenfor, som ligger i filen `displayinfo.js`.

Jeg begynte prosjektet uten å se for mye på hvordan fnugg sin søkemotor fungerer. Jeg ville prøve å lage en søkemotor som jeg mente var best basert på det jeg så for meg brukeren ønsket av informasjon og det jeg kunne få tak i via APIet. 

Jeg brukte Fnuggs Search API til å prøve å søke på litt forskjellige sentere og med litt ulike ord, som f.eks.:

https://api.fnugg.no/search?q=oslo
https://api.fnugg.no/search?q=hemsedal
https://api.fnugg.no/search?q=tryvann

Det jeg oppdaget var at jeg fikk opp flere 

##### displayinfo.js

Basert 

##### displaywidget.js

##### progressbar.js


##### fnugg api

jeg henter data fra ?sourceFields=name,urls,conditions,lifts,slopes

kan 

#### src/sass


## Design og UX

Fnugg har søkeikon, dårlig ux burde fjerne denne for å ikke forvirre brukeren. Den har ingen funksjon.

## Verktøy

I dette prosjketet har jeg brukt npm, uglify til å konkatenere og minifisere javascript og sass.

## 
