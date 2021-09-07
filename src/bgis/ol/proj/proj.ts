import proj4 from "proj4";
import {register} from 'ol/proj/proj4';
import {get as getProjection} from 'ol/proj';
import {Extent} from 'ol/extent';


/**
 * Adds a new custom (= user defined) projection.
 * @param epsgCode The epsg code of the projection.
 * @param wktProjection The wkt definition of the projection.
 * @param extent The optional extent (is only set if provided).
 *
 * ```typescript
 * // Example 1: create and register custom "EPSG:32632" with extent projection.
 * addProjection("EPSG:32632", "+proj=utm +zone=32 +ellps=WGS84 +datum=WGS84 +units=m +no_defs", [166021.4431, 0.0000, 833978.5569, 9329005.1825]);
 * // Example 2: create and register custom "EPSG:32632" without extent projection.
 * addProjection("EPSG:32632", "+proj=utm +zone=32 +ellps=WGS84 +datum=WGS84 +units=m +no_defs");
 * ```
 */
export const addProjection = (epsgCode: string, wktProjection: string, extent?: Extent): void => {
  proj4.defs(epsgCode, wktProjection);
  register(proj4);
  if (extent) {
    getProjection(epsgCode).setExtent(extent)
  }
}

/* register the for austria relevant projections within proj4j */
export const addAustrianProjections = (): void => {
  /* register the for austria relevant projections within proj4j */
  /* austria lambert */
  addProjection("EPSG:31287", "+proj=lcc +lat_1=49 +lat_2=46 +lat_0=47.5 +lon_0=13.33333333333333 +x_0=400000 +y_0=400000 +ellps=bessel +towgs84=577.326,90.129,463.919,5.137,1.474,5.297,2.4232 +units=m +no_defs", [107778, 286080, 694884, 575954]);
  /* gauss krueger */
  addProjection("EPSG:31254", "+proj=tmerc +lat_0=0 +lon_0=10.33333333333333 +k=1 +x_0=0 +y_0=-5000000 +ellps=bessel +towgs84=577.326,90.129,463.919,5.137,1.474,5.297,2.4232 +units=m +no_defs", [-61418, 173743, 114488, 285684]);
  addProjection("EPSG:31255", "+proj=tmerc +lat_0=0 +lon_0=13.33333333333333 +k=1 +x_0=0 +y_0=-5000000 +ellps=bessel +towgs84=577.326,90.129,463.919,5.137,1.474,5.297,2.4232 +units=m +no_defs", [-115771, 130037, 115360, 408003]);
  addProjection("EPSG:31256", "+proj=tmerc +lat_0=0 +lon_0=16.33333333333333 +k=1 +x_0=0 +y_0=-5000000 +ellps=bessel +towgs84=577.326,90.129,463.919,5.137,1.474,5.297,2.4232 +units=m +no_defs", [-115317, 151511, 64308, 432457]);
  /* UTM zone 32 */
  addProjection("EPSG:32632", "+proj=utm +zone=32 +ellps=WGS84 +datum=WGS84 +units=m +no_defs", [166021, 0, 833979, 9329006]);
  /* UTM zone 33 */
  addProjection("EPSG:32633", "+proj=utm +zone=33 +ellps=WGS84 +datum=WGS84 +units=m +no_defs", [166021, 0, 833979, 9329006]);
}

export const EPSG_31287 = getProjection("EPSG:31287");
