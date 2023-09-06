import '../../../src/indexCore.scss';
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import Map from "ol/Map";
import {Attribution, BasemapSource, BottomRight, Button, Footer, MousePosition, ScaleLine} from "../../../src";
import {getCenter} from "ol/extent";

const outputTextarea = document.getElementById("textarea-output") as HTMLTextAreaElement;

/**
 * Custom button 1
 */
class CustomButton1 extends Button {

  constructor() {
    super({ unicode: 0xe945, tooltip: 'CustomButton1 Tooltip', tooltipAsTextElement: true });
  }

  handleEvent(): boolean {
    outputTextarea.value = 'CustomButton1 clicked\n' + outputTextarea.value;
    return true;
  }
}

const customButton1Ctrl = new CustomButton1();

// custom button 2
const customButton2Ctrl = new Button({ iconClassName: 'bgis-icon-tornado', tooltip: 'CustomButton2 Tooltip'});
customButton2Ctrl.on('click', () => {
  outputTextarea.value = 'CustomButton2 clicked\n' + outputTextarea.value;
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
    new BottomRight({
      horizontalControls: [customButton1Ctrl],
      verticalControls: [customButton2Ctrl],
    })
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
