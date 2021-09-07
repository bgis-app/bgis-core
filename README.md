# BGIS Core

bgis (Kurzform für BundesGIS) ist ein generischer Webmapping-Client, der im Auftrag des Bundesministeriums für 
Landwirtschaft, Regionen und Tourismus (BMLRT) entwickelt wurde. Der OpenSource-Client soll als Basis 
zur Nutzung in anderen öffentlichen Stellen und auch im privaten Umfeld eingesetzt werden. Der Client 
basiert auf der jeweils aktuellen Version von Openlayers und zecihnet sich durch einen modularen Aufbau aus.

Die Hauptmerkmale von bgis sind unter anderem:

+ einheitliches Look&Feel
+ hohe Benutzerfreundlichkeit
+ höchstmögliche Barrierefreiheit
+ bereits implementierte Basiskomponenten eines webbasierten Map-Viewers
+ modulare Erweiterbarkeit der Funktionalitäten
+ Unterstützung von mobilen Endgeräten und Touchbedienung
+ vordefinierte Datenquellen und gemeinsam genutzte (Karten-) Dienste
+ besondere Berücksichtigung von INSPIRE und OGD
+ Möglichkeit zur Integration in eine eigene Webseite (bspw. CMS)
+ Authentifizierung bzw. Integration über das Portalverbund-Protokoll (PVP)

## Getting Started 

Install the [`bgis` package](https://www.npmjs.com/package/bgis):

```
# NPM
npm install bgis

# Yarn
yarn add bgis
```

There are two stylesheets in the bgis package folder. Use them depending on your implementation:
+ `bgis_core.css` for the [core version](https://bgis-app.github.io/example-core-features.html)
+ `bgis_client.css` for the [full version](https://bgis-app.github.io/example-full-features.html)


## IntelliSense support and type checking for VS Code

The `bgis` package contains TypeScript definition that includes all documented API 
and protected class members and methods.

## Supported Browsers

`bgis` runs on all modern browsers that support [HTML5](https://html.spec.whatwg.org/multipage/) 
and [ECMAScript 5](http://www.ecma-international.org/ecma-262/5.1/). 
This includes Chrome, Firefox, Safari and Edge.

