import XYZSource from 'ol/source/XYZ.js';
import {AttributionLike} from "ol/source/Source";

/**
 * Mapped type for the VARIANTS constant map
 */
export type Variants = {
  [variant: string]: string
}

/**
 * Available Basemap variants
 */
export const VARIANTS: Variants = {
  geolandbasemap: 'https://mapsneu.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png',
  bmapgrau: 'https://mapsneu.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png',
  bmaporthofoto30cm: 'https://mapsneu.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg',
  bmapgelaende: 'https://mapsneu.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg',
  bmapoberflaeche: 'https://mapsneu.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg',
  bmapoverlay: 'https://mapsneu.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png',
};

/**
 * Options for the {@linkcode BasemapSource} source
 */
export interface BasemapSourceOptions {
  variant?: string;
  attributions?: AttributionLike;
}

/**
 * Convenience source for basemap.at raster maps.
 */
export class BasemapSource extends XYZSource {

  /**
   * @param {Object} [options] Options
   * @param {keyof VARIANTS} [options.variant="geolandbasemap"] Basemap variant
   */
  constructor(options?: BasemapSourceOptions) {
    const variant = options?.variant || 'geolandbasemap';
    super({
      url: VARIANTS[variant],
      attributions: options?.attributions ?? 'Grundkarte: <a href="https://basemap.at/">basemap.at</a>',
      crossOrigin: "Anonymous"
    });
  }
}
