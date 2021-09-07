import '../../../src/indexCore.scss';
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import Map from "ol/Map";
import {
  Attribution,
  BasemapSource,
  BottomRight,
  Footer,
  Layer,
  MousePosition,
  Print,
  ScaleLine,
  Share,
  ToggleEvent,
} from "../../../src";
import {getCenter} from "ol/extent";

const outputTextarea = document.getElementById("textarea-output") as HTMLTextAreaElement;

const shareCtrl = new Share();
shareCtrl.on("click", () => {
  outputTextarea.value = 'share button clicked\n' + outputTextarea.value;
});

const printCtrl = new Print({ preventDefault: true });
printCtrl.on("click", () => {
  outputTextarea.value = 'print button clicked\n' + outputTextarea.value;
});

const layerCtrl = new Layer();
layerCtrl.on("click", () => {
  outputTextarea.value = 'layer button clicked\n' + outputTextarea.value;
});

const bottomRight = new BottomRight({
  horizontalControls: [layerCtrl],
  verticalControls: [printCtrl, shareCtrl],
});

bottomRight.on("toggle", (e: ToggleEvent) => {
  outputTextarea.value ='bottom right toggled - isToggled: ' + e.isToggled + '\n' + outputTextarea.value;
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
    bottomRight
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
