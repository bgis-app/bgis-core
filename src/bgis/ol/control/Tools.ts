import {Button, ButtonOptions} from "./base";

/**
 * A default button with a "tools" icon
 */
export class Tools extends Button {

  /**
   *
   * @param options the button options
   */
  public constructor(options?: ButtonOptions) {
    const opts = options || {};

    super({ iconClassName: 'bgis-icon-tools', tooltip: 'Toolbox einblenden', ...opts });
  }

}
