import '../../../src/indexCore.scss';
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import Map from "ol/Map";
import {Attribution, BasemapSource, BottomRight, Footer, MousePosition, ScaleLine} from "../../../src";
import {getCenter} from "ol/extent";
import {Button, ButtonOptions} from "../../../src/bgis/ol/control/base/Button";

const outputTextarea = document.getElementById("textarea-output") as HTMLTextAreaElement;

/**
 * CustomButton1
 */
class CustomButton1 extends Button {

  constructor(options: ButtonOptions) {
    super(options);
  }

  handleEvent(): boolean {
    outputTextarea.value = 'CustomButton1 clicked\n' + outputTextarea.value;
    return true;
  }
}

/**
 * CustomButton2
 */
class CustomButton2 extends Button {

  constructor() {
    super({ unicode: 0xe945, tooltip: 'CustomButton2 Tooltip', tooltipAsTextElement: true });
  }

  handleEvent(): boolean {
    outputTextarea.value = 'CustomButton2 clicked\n' + outputTextarea.value;
    return true;
  }
}

const customButton1Ctrl = new CustomButton1({ iconClassName: 'bgis-icon-tornado', tooltip: 'CustomButton1 Tooltip'});

const customButton2Ctrl = new CustomButton2();

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
