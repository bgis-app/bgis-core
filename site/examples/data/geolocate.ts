import '../../../src/indexCore.scss';
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import Map from "ol/Map";
import {Attribution, BasemapSource, Footer, GeoLocate, MousePosition, ScaleLine, TopRight, Zoom,} from "../../../src";
import {getCenter} from "ol/extent";
import {LocationRetrievedEvent} from "../../../src/bgis/ol/control/GeoLocate";

const outputTextarea = document.getElementById("textarea-output") as HTMLTextAreaElement;

const geolocateCtrl = new GeoLocate();
geolocateCtrl.on("click", () => {
  outputTextarea.value = 'geolocate button clicked\n' + outputTextarea.value;
});

geolocateCtrl.on("location_retrieved", (e: LocationRetrievedEvent) => {
  outputTextarea.value = 'position retrieved: ' + e.position + '\n' + outputTextarea.value;
});

new Map({
  target: 'bgis-map',
  layers: [new TileLayer({
    source: new BasemapSource()
  })],
  controls: [
    new Footer([
      new ScaleLine(),
      new MousePosition(),
      new Attribution(),
    ]),
    new TopRight([
      geolocateCtrl,
      new Zoom(),
    ]),
  ],
  view: new View({
    center: getCenter([1060000, 5838030, 1913530, 6281290]),
    constrainOnlyCenter: true,
    constrainResolution: false, // discrete zooomlevels
    extent: [1060000, 5838030, 1913530, 6281290],
    maxZoom: 15,
    minZoom: 6,
    zoom: 7,
  })
});
