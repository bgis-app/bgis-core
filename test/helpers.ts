import {Collection, PluggableMap, View} from "ol";
import {Extent, getCenter} from "ol/extent";
import Projection from "ol/proj/Projection";
import Map from "ol/Map";
import ImageLayer from "ol/layer/Image";
import {ImageStatic} from "ol/source";
import {Control} from "ol/control";

let globalMap: PluggableMap | null;
let globalTarget: string | HTMLElement | null;

/**
 *
 */
export const setupStaticImageExample = (controls: Collection<Control> | Control[] | undefined = []): PluggableMap => {

  const extent = [0, 0, 1024, 968] as Extent;
  const projection = new Projection({
    code: 'xkcd-image',
    units: 'pixels',
    extent: extent,
  });

  globalTarget = document.createElement('div');
  globalTarget.style.width = '100px';
  globalTarget.style.height = '100px';
  document.body.appendChild(globalTarget);
  globalMap = new Map({
    controls,
    target: globalTarget,
    layers: [
      new ImageLayer({
        source: new ImageStatic({
          attributions: '© <a href="http://xkcd.com/license.html">xkcd</a>',
          url: 'https://imgs.xkcd.com/comics/online_communities.png',
          projection: projection,
          imageExtent: extent,
        }),
      }),
    ]
  });
  globalMap.setSize([100, 100]);
  globalMap.setView(new View({
    projection: projection,
    center: getCenter(extent),
    zoom: 2,
    maxZoom: 8,
  }));

  return globalMap;
};

/**
 *
 */
export const tearDownStaticImageExample = (): void => {
  globalMap?.dispose();
  document.body.removeChild<HTMLElement>(<HTMLElement>globalTarget);
  globalMap = null;
  globalTarget = null;
}

/**
 * A helper MouseEvent class because with jsdom the default MouseEvent does not support clientX and clientYs
 */
export class FakeMouseEvent extends UIEvent {
  clientX: number;
  clientY: number;

  constructor(type: string, mouseEventInit: MouseEventInit) {
    super(type,mouseEventInit);

    this.clientX = mouseEventInit.clientX || 0;
    this.clientY = mouseEventInit.clientY || 0;

  }
}
