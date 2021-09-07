import Control, {Options} from 'ol/control/Control';
import {Container} from "./Container";

/**
 * A simple footer {@linkcode Container}
 */
export class Footer extends Container {

  /**
   *
   * @param childControls The child controls for the footer container
   * @param options The OpenLayer control options
   */
  constructor(childControls: Control | Control[], options?:Options) {
    const opts = options ? options :{};
    super({...opts , styleClass: 'bgis-footer', childControls});
  }
}
