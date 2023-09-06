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

    super({ iconClassName:'bgis-icon-layer-group', tooltip: 'Begleitkarten verwalten', ...opts });

  }

}
