import '../../src/indexClient.scss';
import {defaults as defaultInteractions} from 'ol/interaction';
import TileLayer from "ol/layer/Tile";
import Map from "ol/Map";
import View from "ol/View";
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
  UiInteraction,
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
    new TopRight([new GeoLocate(), new Zoom()]),
    new Footer([
      new ScaleLine(),
      new MousePosition(),
      new Attribution(),
    ]),
    new BottomRight({
      horizontalControls:
        [new Layer(),
        new ViewList()],
      verticalControls: [new Print(),
      new Share(), new Tools()]
    }),
    new Overview()
  ],
  interactions: defaultInteractions().extend([ new UiInteraction()]),
  view: new View({
    center:  getCenter([1060000, 5838030, 1913530, 6281290]), // fromLonLat([13.4, 47.7]),
    constrainOnlyCenter: true,
    constrainResolution: false, // discrete zoom levels
    extent: [1060000, 5838030, 1913530, 6281290],
    maxZoom: 15,
    minZoom: 6,
    zoom: 7,
  })
});
