import {Button} from "./base";
import {ButtonOptions} from "./base/Button";

/**
 * A default button with Layers icon
 */
export class Layer extends Button {

  /**
   *
   * @param options the button options
   */
  public constructor(options?: ButtonOptions) {
    const opts = options || {};

    super({ unicode:0xe938, tooltip: 'Begleitkarten verwalten', ...opts });

  }

}
