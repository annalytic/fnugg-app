# fnugg-app :snowflake:

## Oppgaven
Oppgaven går ut på å lage en enkel app for å vise ski- og værforholdene for et bestemt skisenter i Norge. Vi skal bruke Fnugg.nos API (https://api.fnugg.no/) til å hente data fra de forskjellige skisenterne. Datene kan enten presenteres direkte til brukerne eller vi kan bruke Fnugg widget (https://www.fnugg.no/widget/resort).

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

Resultatet inneholder masse informasjon om hvert senter som jeg ikke er interessert i. For å hente ut relevant data har jeg lagt ved disse variablene i forespørselen: `?sourceFields=name,urls,conditions`. Resultatet gir oss antall treff, navn, og site-path for hvert skisenter. Merk, men ikke noe id! Med id kunne jeg ha gjort spisset søketresultatet enda mer enn slik løsningen er nå. Les mer om dette i `displayinfo.js` og Diskusjon.

Basert på det brukeren skriver i søkefeltet utføres en AJAX-forespørsel der navnet på skisenterne hentes ut og legges i en array. Denne arrayen mates så tilbake til autocomplete som viser listen til brukeren. Jeg har brukt jQuery for å gjøre AJAX-forespørselen. Fordelen med å bruke jQuery er at man ikke må håndtere eventuelle HTTP-feil som kan resultere fra forspørselen.

Autocompletes parameter `success` håndterer det som skjer etter brukeren har valgt et av alternativene. Når brukeren har valgt et alternativ forteller vi autocomplete at formularet skal sendes ved å si `$('form').submit()`. Filen `search.js` tar seg av det som skjer når formularet sendes. 

##### autocomplete-vanillajs.js
Før jeg bestemte meg for å bruke jQuery UI's autocomplete forsøkte jeg meg på å lage min egen autocomplete i vanilla js. Selv om jeg ikke endte opp med å gå for (den delvis fungerende) løsningen valgte jeg likevel å ha den med her. Jeg bruker HTML5 `datalist`-elementet for å presentere foreslåtte søkeresultater. Årsaken til hvorfor jeg valgte å gå bort fra løsningen er pga. den dårlige støtten, samt manglene rundt events for `options`-elementene. Uten å kunne binde handling til når brukeren velger et av alternativene, må brukeren nå trykke enter to ganger, eller først velge alternativet med musepekeren, også trykke enter for å sende forespørselen.

For å se løsning fjern kommentaren for autocomplete-vanillajs.js i bunnen av body.

##### search.js
Denne filen håndterer det som skjer når formularet sendes. Vi ønsker nemlig ikke at formularet skal sendes, men å vise frem resultatet av skisenteret brukeren søker på. For å få til det har vi sagt `event.preventDefault()` som hindrer formularet i å utføre standard handling, og ber den om å kjøre funksjonen `displayInfo()` istedenfor, som ligger i filen `displayinfo.js`.

##### displayinfo.js

Basert på valget som brukeren tar og verdien som sendes fra `input`-feltet så utføres det en AJAX-forespørsel mot Fnuggs Search API. Data hentes ut og presenteres på siden ved bruk av jQuery `append`.

brukt https://codebeautify.org/jsonviewer treeview gjorde det enklere for meg å hente ut data jeg var interessert i.

##### displaywidget.js

`displaywidget.js` gjør mye av det samme som `displayinfo.js`, bortsett fra at å skrive ut iframe istedenfor.

For å se dette egengenererte resultatet må man fjerne kommentaren rundt `displayWidget()` i `search.js`. Dette krever at hele prosjektet lastes ned på lokal server først.

##### progressbar.js

Jeg har laget en egen js-fil for å lage canvas for prosentandel av skiheiser og skiløyper som er åpne.

#### src/sass

Modularisert sass-kode ligger i mappene components og base. `components` holder stilsett for komponenter som søkefelt, widget, og `base` inneholder normalize og variabler.

## Diskusjon

Jeg begynte prosjektet uten å sette meg mye inn i hvordan Fnugg sin søkemotor fungerer. Jeg ville prøve å lage en søkemotor etter beste mulig evne basert på det jeg så for meg brukeren ønsket av informasjon og det jeg kunne få tak i via APIet. 

Jeg brukte Fnuggs Search API til å søke på litt forskjellig ord og navn som f.eks.:

- https://api.fnugg.no/search?q=oslo
- https://api.fnugg.no/search?q=hemsedal
- https://api.fnugg.no/search?q=skistar+hemsedal
- https://api.fnugg.no/search?q=tryvann

Det jeg oppdaget var at når jeg f.eks. søkte på hemsedal så jeg fikk opp flere sentere som inneholdt ordet hemsedal. Jeg tenkte umiddelbart at jeg kunne bruke dette til å la brukere søke på et *sted* og få opp skisenterne i nærheten av dette stedet. Det kan tenkes at brukere ønsker å sammenlikne forholdene på skisentere i et område, eller å bruke søkemotoren som et slags oppslagsverk for å se hvilke sentere som finnes i et område. Jeg begynte å implementere løsningen på denne måten ved å bruke en `$.each(response, function(key, value) {}` for å loope gjennom og hente ut data for hvert skisentere i resultatet. Det fungerte også å søke på bestemte skisentere. Dersom jeg søkte på Skistar Hemsedal så fikk jeg opp resultatet for det skisenteret og bare det.

Jeg la til en tekst på søkeresultatsiden som viste hva brukeren hadde søkt på. Selv om dette står i søkefeltet allerede så er det enkelte brukere som allikevel forventer at dette står over søkeresultatet. Siden dette står i søkefeltet som er nokså stort og sentralt på siden mener jeg det er overflødig å gjenta det rett under, og kan derfor fjernes. Jeg har likevel valgt å la det stå der i den endelige løsningen.

Jeg la i utgangspunktet også til en søkeknapp til høyre for søkefeltet fordi forskning viser at det resulterer i at *flere* brukere får en bedre brukeropplevelse. Mange brukere forventer at med et søkefelt så følger det en søkeknapp.

Jeg trodde løsningen min var vanntett helt til jeg søkte på "Oslo skisenter". Oslo skisenter er det faktiske navnet på et skisenter, og jeg forventet derfor og kun få opp ett søkeresultat. Men det jeg fikk var seks ulike skisentere som alle inneholdt ordet "skisenter" (https://api.fnugg.no/search?sourceFields=name&q=oslo+skisenter) Og verst av alt, disse senterne lå absolutt ikke i nærheten av hverandre. Etterhvert oppdaget jeg flere slike resultater. Jeg forsøkte å finne noe om hvordan dette Search APIet fungerte, uten hell. 

Etter mye frustrasjon endte jeg opp med å gå bort fra frisøk, mao. tvinge brukeren til å velge et av skisenterne blant søkeforslagene. Dersom brukeren forsøker å søke på noe annet enn søkeforslagene skjer det ikke ingenting.

Ettersom jeg har lagt til rette for "search on selection" så er det ikke lenger behov for en submit-knapp. Denne har ingen funksjonen siden brukeren tvinges til å velge et av alternativene i søkeforslaget. Jeg reagerer på at på fnugg.no sine sider så har de et søkeikon til høyre for søkefeltet uten noen funksjon. Denne burde fjernes.

Siden resultatene fra Autocomplete API ikke inneholder noen Id tilknyttet søkeforslagene så har vi ingen måte å matche på Id når vi henter ut skisenter fra Search API. Det eneste vi kan matche på er navn. Som jeg trakk frem i avsnittet ovenfor så får man ikke alltid tilbake ett resultat selv om man skriver navnet på skisenteret ordrett. Selv om vi iblant får flere skisentere i søkeresultat som burde gitt ett skisenter, så ser det ut til at det første i søkeresultatet vanligvis matcher nokså godt med søkeordet. Jeg har derfor valgt å hente ut det første objektet i arrayen/søkeresultatet. 


## Design og UX

Selve søkefeltet har jeg gitt en hvit bakgrunn for å vise tydelig frem at dette er et søkefelt.

`text-decoration: underline` på navnet på skisenteret i søkeresultatet. Helt umulig å vite at det er en lenke siden fargen- og størrelsen
er lik vanlig tekst.

## Responsivhet og kompabilitet

Testet i flere nye chrome, safari og firefox nettlesere.
tre breakpoints 0px, 640px og 1020px.

## Verktøy

I dette prosjketet har jeg brukt npm som task runner, uglify til å konkatenere og minifisere javascript og sass.

