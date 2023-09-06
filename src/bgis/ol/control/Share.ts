import {Button, ButtonOptions} from "./base";

/**
 * A default button with a "share" icon
 */
export class Share extends Button {

  static readonly DEFAULT_TOOLTIP_TEXT = 'Ansicht teilen';
  static readonly DEFAULT_UNICODE = 0xe92c;

  /**
   *
   * @param options the button options
   */
  public constructor(options?: ButtonOptions) {
    const opts = options || {};

    super({ iconClassName: 'bgis-icon-share', tooltip: Share.DEFAULT_TOOLTIP_TEXT, ...opts });

  }

}
