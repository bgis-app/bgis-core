import {Collection, Map, View} from "ol";
import {Extent, getCenter} from "ol/extent";
import Projection from "ol/proj/Projection";
import ImageLayer from "ol/layer/Image";
import {ImageStatic} from "ol/source";
import {Control} from "ol/control";

let globalMap: Map | null;
let globalTarget: string | HTMLElement | null;

/**
 * Create a map with a static image layer
 * and attach it to the dom with a size of 100x100px
 */
export const setupStaticImageExample = (controls: Collection<Control> | Control[] | undefined = []): Map => {

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
          // @ts-ignore
          url: `http://localhost:${SERVERPORT}/static-image`, // 'https://imgs.xkcd.com/comics/online_communities.png',
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
 * Dispose and remove the global map object from DOM
 */
export const tearDownStaticImageExample = (): void => {
  globalMap?.dispose();
  document.body.removeChild<HTMLElement>(<HTMLElement>globalTarget);
  globalMap = null;
  globalTarget = null;

}

/**
 * Sets the `document.documentElement.clientWidth` to given width
 * and dispatches the window resize event
 * @param width
 */
export const emulateWindowsResizeEvent = (width: number): void => {
  Object.defineProperty(document.documentElement, 'clientWidth', {
    writable: true,
    configurable: true,
    value: width,
  });

  window.dispatchEvent(new Event('resize'));
}

/**
 * A helper PointerEvent class
 * because with jsdom the default PointerEvent does not support clientX and clientYs
 */
export class FakePointerEvent extends UIEvent {
  clientX: number;
  clientY: number;

  constructor(type: string, pointerEventInit: PointerEventInit) {
    super(type,pointerEventInit);

    this.clientX = pointerEventInit.clientX || 0;
    this.clientY = pointerEventInit.clientY || 0;

  }
}
