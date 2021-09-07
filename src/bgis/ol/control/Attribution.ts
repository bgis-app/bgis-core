import {default as OlAttribution, Options} from 'ol/control/Attribution';

/**
 * A simple wrapper control of the OpenLayer Attribution control
 *
 * It is collapsed and we add a bgis style class (*bgis-copyright*).
 * Some visible changes are made via css.
 */
export class Attribution extends OlAttribution {

  /**
   *
   * @param options The Openlayer Attribution options
   */
  constructor(options?: Options) {

    const opts = options ? options : {
      collapsed: false
    };
    super(opts);

    this.element.className += ' bgis-copyright';
  }

}
