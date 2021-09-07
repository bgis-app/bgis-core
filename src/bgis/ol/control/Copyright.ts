import Control, {Options} from 'ol/control/Control';

/**
 * The options for the {@linkcode Copyright} control
 */
export interface CopyrightOptions extends Options {
  /** The displayed text **/
  label?: string;
}

/**
 * A simple control to display some copyright information.
 * Define the text via {@linkcode CopyrightOptions}, otherwise
 * a default text is shown. You can also use HTML.
 */
export class Copyright extends Control {

  /**
   *
   * @param options The options
   */
  constructor(options?: CopyrightOptions) {
    const opts = options ? options : { target: undefined, label: undefined };

    const element = document.createElement('div');
    element.innerHTML = opts.label ? opts.label : '&copy; by bgis Team';

    super({
      element: element,
      target: opts.target,
    });
  }
}
