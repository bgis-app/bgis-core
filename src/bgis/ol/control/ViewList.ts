import {Button} from "./base";
import {ButtonOptions} from "./base/Button";


/**
 * A default button with a "view list" icon
 */
export class ViewList extends Button {

  /**
   *
   * @param options the button options
   */
  public constructor(options?: ButtonOptions) {
    const opts = options || {};

    super({ unicode:0xe937, tooltip: 'Liste anzeigen', ...opts });

  }

}
