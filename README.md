# fnugg-app :snowflake:

Demo: https://annalytic.github.io/fnugg-app

## Oppgaven
Oppgaven er å lage en enkel app for å vise ski- og værforholdene for skisentere i Norge. Vi skal bruke Fnugg.nos API (https://api.fnugg.no/) til å hente data fra de forskjellige skisentrene. Enten kan dataene presenteres direkte til brukeren eller vi kan bruke Fnugg widget (https://www.fnugg.no/widget/resort).

Appen skal ha grunnleggende UX-funksjonalitet for å finne skisentere. Den skal være responsiv og kompatibel med alle aktuelle nettlesere.

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
  .gitignore
```

### index.html
Hovedsiden for appen. Den inneholder `html`, `head` og `body`. `head` inneholder en rekke viktige metatagger med informasjon om HTML-dokumentet som f.eks. tittel, beskrivelse, informasjon om viewport.

`head` inneholder to stilark, hovedstilarket `style.css` og `jquery-ui.css`.

I `body` er det ett `form`-felt med tilhørende `input`-felt og `submit`-knapp.

Div-elementet `welcome` viser en kort velkomsttekst og logoen til Fnugg. Ved søk vil denne fjernes fra DOM og erstattes med `resort-results` som viser resultatet av søket.

### /dist
Distribusjonsmappe som inneholder konkatenert og minifisert javascript og css.

### /src

#### /assets
Inneholder logo hentet fra http://fnugg.no og værsymboler hentet fra yr.no (http://om.yr.no/symbol/)

#### /js

For å gjøre det lettere for andre og meg selv å lese og forstå javascript-koden har jeg delt den opp i separate javascript-filer etter funksjonalitet.

Nedenfor følger kort forklaring av hva koden i de ulike filene gjør. Mer spesifikke kommentarer finner du i selve filene.

##### autocomplete-jqueryui.js

Jeg har brukt jQuery UI's widget **autocomplete** til å presentere søkeforslag basert på det brukeren skriver i søkefeltet. Widgetens parameter `source` kan ta imot en streng, array eller funksjon(forespørsel, respons). Jeg har brukt den siste varianten til å utføre AJAX-forespørsel mot **Fnuggs Autocomplete API** (https://api.fnugg.no/suggest/autocomplete?q=).

Fnuggs Autocomplete API fungerer på følgende måte: Hvis brukeren f.eks. skriver *"Fje"* vil APIet returnere alle skisentere som inneholder ord som begynner på *"Fje"*. Gå til https://api.fnugg.no/suggest/autocomplete?q=Fje for å se resultatet av forspørselen. Resonsen er i JSON-format.

Resultatet inneholder masse irrelevant informasjon. For å kun hente ut data jeg trenger legger jeg ved disse variablene i forespørselen: `?sourceFields=name,urls,conditions`. Resultatet gir oss *antall treff, navn, og site-path* for hvert skisenter. Dersom resultatet hadde gitt oss `id` kunne vi ha returnert et mer nøyaktig resultat til brukeren. Les mer om hva jeg mener med dette i `displayinfo.js` og **Diskusjon**.

Basert på det brukeren skriver i søkefeltet utføres en AJAX-forespørsel der navnet på skisenterne hentes ut og legges i en array. Denne arrayen mates så tilbake til autocomplete som viser listen til brukeren. Jeg har brukt jQuery for å gjøre AJAX-forespørselen. Fordelen med å bruke jQuery er at man ikke må ta stilling til alle HTTP-statuskoder, og håndtere eventuelle HTTP-feil som kan resultere fra forspørselen.

Autocompletes parameter `success` håndterer det som skjer etter brukeren har valgt et av alternativene. Når brukeren har valgt et alternativ forteller vi autocomplete at formularet skal sendes ved å si `$('form').submit()`. Filen `search.js` tar seg av det som skjer når formularet sendes. 

##### autocomplete-vanillajs.js

Før jeg bestemte meg for å bruke jQuery UI's autocomplete prøvde jeg meg på å lage min egen autocomplete i vanilla js. Selv om jeg ikke endte opp med å gå for (den delvis fungerende) løsningen valgte jeg likevel å ha den med her. Jeg brukte HTML5 `datalist`-elementet for å presentere foreslåtte søkeresultater. Årsaken til hvorfor jeg valgte å gå bort fra løsningen var grunnet den dårlige støtten for datalist, samt manglene rundt eventhandlers for `options`-elementene.

For å se løsningen må du fjerne kommentaren rundt `autocomplete-vanillajs.js` i bunnen av `body`. Dette forutsetter at du først kloner repoet og kjører det på lokal server.

##### search.js
Denne filen håndterer det som skjer når formularet sendes. Vi ønsker ikke at formularet skal sendes når brukeren trykker enter, men at resultatet av søket skal presenteres. Jeg har brukt `event.preventDefault()` for å hindre formularet i å utføre standard handling, og ber programmet istedenfor å kjøre funksjonen `displayInfo()`, som ligger i filen `displayinfo.js`.

##### displayinfo.js

Basert på søkeforslaget brukeren velger kjøres en AJAX-forespørsel mot Fnuggs Search API. Data hentes ut og presenteres på siden ved hjelp av jQuery `append`.

https://codebeautify.org/jsonviewer JSON Treeviewer var til stor hjelp i jobben med å finne hvilke keys jeg skulle ha tak i.

APIet inneholdt ingen værikoner og værstatusmeldingene var på engelsk. Jeg måtte derfor hente værikoner fra yr.no (http://om.yr.no/symbol/).

##### displaywidget.js

`displaywidget.js` gjør mye av det samme som `displayinfo.js`, men istedenfor å generere masse diver genererer den en iframe.

For å se resultatet må du fjerne kommentaren rundt `displayWidget()` i `search.js`.

##### progressbar.js

Jeg har laget en egen js-fil for å lage `canvas` for prosentandel av skiheiser og skiløyper som er åpne.

#### src/sass

Modularisert sass-kode ligger i mappene `/components` og `/base`. `/components` holder stilregler for komponenter som søkefelt, widget, og `base` inneholder normalize, variabler og typografi.

### .gitignore

Ber git ignorerer mappen  `/node_modules`.

## Diskusjon

Jeg begynte prosjektet uten å sette meg for mye inn i hvordan Fnugg sin søkemotor fungerer. Jeg ville lage en søkemotor etter beste mulig evne basert på det jeg kunne få tak i via APIet og det jeg så for meg brukeren ønsket av informasjon.

Jeg brukte Fnuggs Search API til å søke på litt forskjellig ord og navn for å se hva jeg fikk tilbake, som f.eks:

- https://api.fnugg.no/search?q=oslo
- https://api.fnugg.no/search?q=hemsedal
- https://api.fnugg.no/search?q=skistar+hemsedal
- https://api.fnugg.no/search?q=tryvann

Når jeg søkte på f.eks. *hemsedal* fikk jeg opp flere skisentere som inneholdt ordet *hemsedal*. Jeg tenkte umiddelbart at jeg kunne bruke dette å lage en søkemotor der brukeren kan søke på et *sted/navn* og få opp skisentere i nærheten av dette stedet. Det kan tenkes at brukere ønsker å sammenlikne forholdene på skisentere i et område, eller å bruke søkemotoren som et slags oppslagsverk for å se hvilke sentere som finnes i et bestemt område.

Jeg begynte å implementere løsningen på denne måten ved å bruke en `$.each(response, function(key, value) {}` for å loope gjennom og hente ut data for hvert skisentere i resultatet. Det fungerte også å søke på bestemte skisentere. Dersom jeg søkte på *Skistar Hemsedal* fikk jeg opp resultatet for det skisenteret og bare det.

Jeg la til en tekst på søkeresultatsiden som viste hva brukeren hadde søkt på. Selv om dette står i søkefeltet allerede så er det enkelte brukere som likevel forventer at dette står over søkeresultatet. Siden søkefeltet er nokså stort og sentralt på siden mener jeg det er unødvendig å gjenta det rett under, og derfor kan fjernes. Jeg har likevel valgt å la det stå der i den endelige løsningen.

Jeg la i utgangspunktet også til en søkeknapp til høyre for søkefeltet fordi forskning viser at det resulterer i at *flere* brukere får en god brukeropplevelse. Mange brukere forventer at med et søkefelt så følger det en søkeknapp.

Jeg trodde løsningen min var vanntett helt til jeg søkte på *Oslo skisenter*. Oslo skisenter er det faktiske navnet på ett skisenter, og jeg forventet derfor og kun få opp ett søkeresultat. Men det jeg fikk var seks ulike skisentere som alle inneholdt ordet "skisenter" (https://api.fnugg.no/search?sourceFields=name&q=oslo+skisenter) Flere av skisenterne lå heller ikke i nærheten av hverandre. Etterhvert oppdaget jeg flere slike rare resultater. Jeg forsøkte å finne noe om hvordan Search APIet fungerte, uten hell.

En søkemotor der brukeren kan søke fritt og få resultater som enten inneholder ordet eller skisentere i nærheten av området som søkes på tror jeg hadde vært svært attaktivt og nyttig for mange. Dessverre valgte jeg å gå bort fra denne løsningen da jeg merket at APIet returnerte masse ymse resultater som ikke hang helt på greip i flere tilfeller. Jeg endte opp med å gå for en løsningen der brukeren må velge et av skisenterne blant søkeforslagene. Dersom brukeren forsøker å søke på noe annet enn søkeforslagene skjer det ikke ingenting.

Ettersom jeg har lagt til rette for "search on selection" så er det ikke lenger behov for en submit-knapp. Denne har ingen funksjonen siden brukeren tvinges til å velge et av alternativene i søkeforslaget. Jeg reagerer på at på fnugg.no sine sider så har de et søkeikon til høyre for søkefeltet uten noen funksjon. Denne burde fjernes.

Siden resultatene fra Autocomplete API ikke inneholder noen id tilknyttet søkeforslagene så har vi ingen måte å matche på id når vi henter ut skisenter fra Search API. Det eneste vi kan matche på er navn. Som jeg trakk frem i avsnittet ovenfor så får man ikke alltid tilbake ett resultat selv om man skriver navnet på skisenteret ordrett. Selv om vi iblant får flere skisentere i søkeresultatet som burde ha gitt ett skisenter, så ser det ut til at det første i søkeresultatet vanligvis matcher nokså godt med søkeordet. Jeg har derfor valgt å hente ut det første objektet i arrayen/søkeresultatet. 

Hadde jeg skrevet javascript-koden på nytt hadde jeg samlet alle AJAX-forespørseler i en javascript-fil med url og parametere som input-parametere til en funksjon som utfører forespørselen. Jeg hadde deretter brukt deffered og promises som when() og then() til å håndtere svaret.

## Design og UX

Selve søkefeltet har jeg gitt en hvit bakgrunnsfarge for å vise tydelig frem at dette er et søkefelt.

Jeg har også lagt til `text-decoration: underline` på navnet på skisenteret i søkeresultatet. Slik lenken ser ut i designet er det helt umulig å vite at det er en lenke siden fargen- og størrelsen er lik den vanlige teksten.

## Responsivitet og kompabilitet

Til å teste appen har jeg benyttet browserstack.com. Jeg har testet appen i flere versjoner av nettleserne Chrome, Safari, Firefox og IE11.

Det er benyttet tre breakpoints: 0px, 640px og 1020px.

## Verktøy

I dette prosjketet har jeg brukt npm til å håndtere oppgaver. Uglify er benyttet til å konkatenere og minifisere javascript og sass.

