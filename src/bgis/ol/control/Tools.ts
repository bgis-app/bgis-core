import {Button} from "./base";
import {ButtonOptions} from "./base/Button";

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

    super({ unicode: 0xe93b, tooltip: 'Toolbox einblenden', tooltipAsTextElement: true, ...opts });
  }

}
