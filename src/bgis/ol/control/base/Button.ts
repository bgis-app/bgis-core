import Control, {Options} from "ol/control/Control";
import {CompositeControl} from "./CompositeControl";
import BaseEvent from "ol/events/Event";
import Event from "ol/events/Event";
import {ObjectOnSignature} from "ol/Object";
import {OnReturn} from "ol/Observable";

/**
 * Options for {@linkcode Button}
 */
export interface ButtonOptions extends Options {

  /** The unicode number of the font icon, e.g. 0xe903 **/
  unicode?: number | null,

  /** The text used for the title and aria attributes of the button container and the button itself. **/
  tooltip?: string,

  /** Style class name for the container  **/
  containerClassName?: string,

  /** Style class name for the button element **/
  iconClassName?: string | null,

  /** If 'true' the tooltip text will be rendered as visible text element  **/
  tooltipAsTextElement?: boolean,

  /** If 'true' the default button click handler will not be executed **/
  preventDefault?: boolean
}

/**
 * The extended signature for the on method
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ButtonOnSignature<Return> = ((type: "click" | "click"[], listener: (event: Event) => any) => Return) & ObjectOnSignature<Return>;

/**
 * **Abstract base class for buttons**
 *
 * A button is an OpenLayer control with a default layout. You can change some style classes, tooltips etc
 * with the {@linkcode ButtonOptions}
 *
 * Some buttons extent from OpenLayer controls with its features, but most of them are just a shell for further implementations
 *
 * You can set the icon font of the button with the unicode number or the iconClassName option.
 *
 * @event click A Button dispatches the CLICK event so that you can listen to it with the *on* OpenLayer method
 * Example:
 * ```typescript
 * const printCtrl = new Print({ preventDefault: true });
 * printCtrl.on(EventType.CLICK, this.handlePrint);
 * ```
 * Alternativly you can override the {@linkcode handleEvent} method
 *
 * @remark As a button is also a CompositeControl it can have child controls. E.g. it's used with the {@linkcode ToggleButton}
 *
 */
export abstract class Button extends CompositeControl {

  /** The HTML element of the button **/
  protected button: HTMLButtonElement;

  /** The unicode for the font icon **/
  protected unicode: number | null;

  /** The icons css class name **/
  protected iconClassName: string | null;

  /**
   * @override
   **/
  public on!: ButtonOnSignature<OnReturn>;

  /**
   *
   * @param options Button options
   * @param childControls Optional child controls
   * @event click The event fired when the button is clicked
   */
  protected constructor(options: ButtonOptions, childControls?: Control | Control[]) {

    options.tooltipAsTextElement = options.tooltipAsTextElement ? options.tooltipAsTextElement : false;

    options.unicode = options.unicode || null;
    options.iconClassName = options.iconClassName || null;
    if(options.unicode===null && options.iconClassName===null) {
      options.unicode = 0xe903;
    }
    options.tooltip = options.tooltip || '';

    const buttonContainerElement = options.element ? options.element : document.createElement('div') as HTMLDivElement;
    buttonContainerElement.className = options.containerClassName ? options.containerClassName : 'ol-control bgis-control';
    buttonContainerElement.title = options.tooltip;

    const buttonElement = document.createElement('button') as HTMLButtonElement;
    buttonElement.className = 'bgis-icon-button';

    if(options.unicode !== null) {
      buttonElement.textContent = String.fromCodePoint(options.unicode);
    } else if (options.iconClassName !== null) {
      buttonElement.appendChild(Button.getIconElementForIconClassName(options.iconClassName));
    }

    buttonElement.title = options.tooltip;
    if(options.tooltip.length > 0) {
      buttonElement.setAttribute('aria-label', options.tooltip);
    }
    buttonContainerElement.append(buttonElement);

    if (options.tooltipAsTextElement) {
      const divElement = document.createElement('div') as HTMLDivElement;
      divElement.className = 'bgis-control-button-text-container';
      const spanElement = document.createElement('span') as HTMLSpanElement;
      spanElement.textContent = options.tooltip;
      spanElement.className = 'bgis-control-button-text';
      divElement.appendChild(spanElement);
      buttonContainerElement.appendChild(divElement);
    }

    super(childControls ? childControls : [], {
      ...options,
      element: buttonContainerElement
    });

    this.unicode = options.unicode;
    this.iconClassName = options.iconClassName;
    this.button = buttonElement;

    this.element.addEventListener("click", () => this.dispatchEvent("click"), false);

    if(!options.preventDefault) {
      this.on("click", this.handleEvent);
    }

  }

  /**
   * This is the default click handler of a button
   *
   * Override it for your benefit or disable execution with options.preventDefault
   * @param event
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handleEvent(event: BaseEvent): boolean {
    return true;
  }

  /**
   * The getter for the button
   */
  public getButton(): HTMLButtonElement {
    return this.button;
  }

  /**
   * A setter to change the unicode for the button font icon.
   * Removes the icon tag for the button.
   * @param unicode
   */
  public setButtonUnicode(unicode: number): void {
    this.getButton().innerHTML = '';
    this.getButton().textContent = String.fromCodePoint(unicode);
  }

  /**
   * A setter to change the icon class name for the button.
   * Resets the unicode for the button icon.
   * @param iconClassName
   */
  public setButtonIconClassName(iconClassName: string): void {
    this.getButton().textContent = '';
    this.getButton().innerHTML = '';
    this.getButton().appendChild(Button.getIconElementForIconClassName(iconClassName));
  }

  /**
   * Get an icon element for the given css class name
   *
   * @param iconClassName
   * @protected
   */
  static getIconElementForIconClassName(iconClassName: string): HTMLElement {
    const iconElement = document.createElement('i');
    iconElement.className = 'bgis-icon ' + iconClassName;
    return iconElement;
  }

}
