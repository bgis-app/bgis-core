import {Button, ButtonOptions} from "./base";

/**
 * A default button with a "print" icon
 */
export class Print extends Button {

  /**
   *
   * @param options the button options
   */
  public constructor(options?: ButtonOptions) {
    const opts = options || {};

    super({iconClassName: 'bgis-icon-print', tooltip: 'Ansicht drucken', ...opts});

  }

}
