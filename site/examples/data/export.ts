import '../../../src/indexCore.scss';
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import Map from "ol/Map";
import {
  Attribution,
  BasemapSource,
  BottomRight,
  Footer,
  MousePosition,
  Overview,
  Print,
  ScaleLine,
} from "../../../src";
import {getFixedZoomPngOfMap, getVarZoomPngOfMap} from "../../../src/bgis/ol/util/pngOfMap";
import {downloadBase64EncFile} from "../../../src/bgis/util/base64";
import {getPngOfOverview} from "../../../src/bgis/ol/util/pngOfOverview";
import {getPngOfScaleLine} from "../../../src/bgis/ol/util/pngOfScaleLine";

const printCtrl = new Print({tooltipAsTextElement: false});

const map = new Map({
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
    new BottomRight({
      horizontalControls:
        [printCtrl],
      verticalControls: []
    }),
    new Overview()
  ],
  view: new View({
    center: [1822417.42, 6141720.42],
    constrainOnlyCenter: true,
    constrainResolution: false, // discrete zooomlevels
    extent: [1060000, 5838030, 1913530, 6281290],
    maxZoom: 15,
    minZoom: 6,
    zoom: 14,
  })
});

printCtrl.on("click", () => {

  document.getElementById('spinner')!.style.display = '';

  getFixedZoomPngOfMap(map).then(exportedPng => {
    downloadBase64EncFile(exportedPng, 'map-default-fixed-zoom.png');
    console.log('default with fixed zoom =======');
    return getFixedZoomPngOfMap(map, 500, 300);
  }).then(exportedPng => {
    downloadBase64EncFile(exportedPng, 'map-500x300-fixed-zoom.png');
    console.log('default with var zoom =======');
    return getVarZoomPngOfMap(map);
  }).then(exportedPng => {
    downloadBase64EncFile(exportedPng, 'map-default-var-zoom.png');
    console.log('a4 landscape with 72dpi (map, 297mm, 210mm) - var zoom');
    return getVarZoomPngOfMap(map, 72 * 297 / 25.4, 72 * 210 / 25.4);
  }).then(exportedPng => {
    downloadBase64EncFile(exportedPng, 'map-a4-landscape-72-var-zoom.png');
    console.log('a4 landscape with 300dpi (map, 297mm, 210mm) - var zoom');
    return getVarZoomPngOfMap(map, 300 * 297 / 25.4, 300 * 210 / 25.4);
  }).then(exportedPng => {
    downloadBase64EncFile(exportedPng, 'map-a4-landscape-300-var-zoom.png');
    return getPngOfOverview(map);
  }).then(exportedPng => {
    downloadBase64EncFile(exportedPng, 'map-overview-default.png');
    return getPngOfOverview(map, undefined, false);
  }).then(exportedPng => {
    downloadBase64EncFile(exportedPng, 'map-overview-transparent.png');
    return getPngOfOverview(map, '400px', false);
  }).then(exportedPng => {
    downloadBase64EncFile(exportedPng, 'map-overview-400px-transparent.png');
    return getPngOfScaleLine(map);
  }).then(exportedPng => {
    downloadBase64EncFile(exportedPng, 'map-scaleline-default.png');
    return getPngOfScaleLine(map, undefined, 3);
  }).then(exportedPng => {
    downloadBase64EncFile(exportedPng, 'map-scaleline-scale-3.png');
    return getPngOfScaleLine(map, undefined, 3, false);
  }).then(exportedPng => {
    downloadBase64EncFile(exportedPng, 'map-scaleline-scale-3-transparent.png');
    return getPngOfScaleLine(map, 400);
  }).then(exportedPng => {
    downloadBase64EncFile(exportedPng, 'map-scaleline-minwidth-400.png');
    return getPngOfScaleLine(map, 400, 3);
  }).then(exportedPng => {
    downloadBase64EncFile(exportedPng, 'map-scaleline-scale-3-minwidth-400.png');
    return getPngOfScaleLine(map, 400, 3, false);
  }).then(exportedPng => {
    downloadBase64EncFile(exportedPng, 'map-scaleline-scale-3-minwidth-400-transparent.png');
    document.getElementById('spinner')!.style.display = 'none';
    document.getElementById('ready')!.style.display = '';
  }).catch(e => {
    console.log('EXPORT ERROR', e);
  });

});
