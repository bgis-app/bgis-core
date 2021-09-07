import {default as OlZoom, Options} from 'ol/control/Zoom';

/**
 * Zoom buttons control
 * The OpenLayers Zoom control is the base class
 */
export class Zoom extends OlZoom {

  /**
   * Constructor
   * @param options the OpenLayers Zoom control options
   */
  constructor(options?: Options) {

    const opts = options ? options : {};

    super({...opts,
      zoomInLabel:  String.fromCodePoint(0xe934),
      zoomOutLabel: String.fromCodePoint(0xe935) });

    this.element.className = 'ol-control bgis-control zoom-container';
  }
}
