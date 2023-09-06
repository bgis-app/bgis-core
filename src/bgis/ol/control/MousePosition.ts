import {default as OlMousePosition, Options as OlMousePositionOptions} from 'ol/control/MousePosition';
import {Coordinate, format} from 'ol/coordinate';

/**
 * Displays the mouse position in the map.
 */
export class MousePosition extends OlMousePosition {

/**
   * Creates a new mouse position control with the dfault values..
   * ```typescript
   * // Example: create a new MousePosition control with the default parameters.
   * const mousePositionControl = new MousePosition();
   * ```
   * @param options All options of the original OpenLayers MousePosition control are alowed.
   */
  constructor(options?: OlMousePositionOptions) {

    const opts = options ? options : {};

    opts.projection = opts.projection ? opts.projection : 'EPSG:4326';
    opts.coordinateFormat = opts.coordinateFormat ? opts.coordinateFormat : (coordinate: Coordinate | undefined) => coordinate ? format(coordinate, '{y}°N/{x}°E', 5) : '';
    opts.placeholder = opts.placeholder ? opts.placeholder : '&nbsp;-&nbsp;°N/&nbsp;-&nbsp;°E';
    opts.className = opts.className ? opts.className : 'ol-control ol-mouse-position bgis-mouseposition';

    super(opts);
  }


}


