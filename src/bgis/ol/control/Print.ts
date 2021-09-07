import {Button} from "./base";
import {ButtonOptions} from "./base/Button";

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

    super({unicode: 0xe912, tooltip: 'Ansicht drucken', tooltipAsTextElement: true, ...opts});

  }

}
