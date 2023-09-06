import '../../src/indexCore.scss';
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import Map from "ol/Map";
import {defaults as defaultInteractions} from 'ol/interaction';
import {
  Attribution,
  BasemapSource,
  BottomRight,
  Footer,
  GeoLocate,
  Layer,
  MousePosition,
  Overview,
  Print,
  ScaleLine,
  Share,
  Tools,
  TopRight,
  ViewList,
  Zoom
} from "../../src";
import {getCenter} from "ol/extent";

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
    new BottomRight({horizontalControls:
      [new Layer(),
      new ViewList()],
      verticalControls: [new Print(),
        new Share(), new Tools()]
    }),
   new TopRight([
      new GeoLocate(),
      new Zoom(),
   ]),
    new Overview()
  ],
  interactions: defaultInteractions(),
  view: new View({
    center: getCenter([1060000, 5838030, 1913530, 6281290]), // fromLonLat([13.4, 47.7]),
    constrainOnlyCenter: true,
    constrainResolution: false, // discrete zoom levels
    extent: [1060000, 5838030, 1913530, 6281290],
    maxZoom: 15,
    minZoom: 6,
    zoom: 7,
  })
});
