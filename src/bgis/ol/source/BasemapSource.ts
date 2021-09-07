import XYZSource from 'ol/source/XYZ.js';

/**
 *
 */
export interface Variants {
  [variant: string]: string
}

/**
 * Available Basemap variants
 * @private
 */
export const VARIANTS: Variants = {
  geolandbasemap: 'https://maps{1-4}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png',
  bmapgrau: 'https://maps{1-4}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png',
  bmaporthofoto30cm: 'https://maps{1-4}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg',
  bmapgelaende: 'https://maps{1-4}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg',
  bmapoberflaeche: 'https://maps{1-4}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg',
  bmapoverlay: 'https://maps{1-4}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png',
};

/**
 *
 */
export interface BasemapSourceOptions {
  variant?: string;
}

/**
 * Convenience source for basemap.at raster maps.
 */
export class BasemapSource extends XYZSource {

  /**
   * @param {Object} [options] Options
   * @param {keyof variants} [options.variant="geolandbasemap"] Basemap variant
   */
  constructor(options?: BasemapSourceOptions) {
    const variant = options?.variant || 'geolandbasemap';
    super({
      url: VARIANTS[variant],
      attributions: 'Grundkarte: <a href="https://basemap.at/">basemap.at</a>',
      crossOrigin: "Anonymous"
    });
  }
}
