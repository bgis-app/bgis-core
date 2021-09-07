import Control, {Options} from 'ol/control/Control';
import {Container} from "./Container";

/**
 * A simple {@linkcode Container} for controls on the upper right corner
 */
export class TopRight extends Container {

  /**
   *
   * @param childControls The child control or an array of child controls
   * @param options The OpenLayer options
   */
  constructor(childControls: Control | Control[], options?:Options) {
    const opts = options ? options :{};
    super({...opts , styleClass: 'bgis-top-right', childControls});
  }
}
