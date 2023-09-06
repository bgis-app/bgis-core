import EventType from "ol/events/EventType";
import {createChildIfNotExist, removeChildrenIfExist, toggleClass} from "../../../util";
import {Container} from "../container";
import {Button, ButtonOptions} from "./Button";
import BaseEvent from "ol/events/Event";

/**
 * The toggle event which is dispatched when the {@link ToggleButton} is clicked
 */
export class ToggleEvent extends BaseEvent {

  /** A flag to show the status of a toggle event **/
  isToggled: boolean;

  /**
   *
   * @param type The event type
   * @param isToggled The flag to show the state of the toggle
   */
  constructor(type: string, isToggled: boolean) {
    super(type);

    this.isToggled = isToggled;
  }
}

/**
 * The option for the {@link ToggleButton}
 */
export interface ToggleButtonOptions extends ButtonOptions {
  /** The unicode of the font icon visible when the button is clicked **/
  unicodeToggled?: number,

  /** The css class name of the font icon visible when the button is clicked **/
  iconClassNameToggled?: string,

  /** The {@link Container} which visibility get toggled **/
  containerToToggle: Container
}

/**
 * A {@link Button} to toggle the visibility of a {@link Container}
 */
export class ToggleButton extends Button {

  /** The {@link Container} which visibility get toggled **/
  protected containerToToggle: Container;

  /** The unicode of the font icon visible when the button is clicked **/
  protected unicodeToggled: number | null;

  /** The css class name of the font icon visible when the button is clicked **/
  protected iconClassNameToggled: string | null;

  /** The flag of the toggle status **/
  protected _isToggled: boolean;

  /**
   *
   * @param options The options
   */
  public constructor(options: ToggleButtonOptions) {

    const opts = options ? options : {};

    super(opts as ButtonOptions, options.containerToToggle);

    this._isToggled = false;
    this.containerToToggle = options.containerToToggle;
    this.unicodeToggled = options.unicodeToggled || null;
    this.iconClassNameToggled = options.iconClassNameToggled || null;

    if(this.unicodeToggled === null && this.iconClassNameToggled === null) {
      this.unicodeToggled = 0xe903;
    }

  }

  /**
   * The overridden handleEvent method
   * @override
   * @param event
   */
  public handleEvent(event: BaseEvent): boolean {
    if(event.type === EventType.CLICK) {
      this.isToggled = !this.isToggled;
      this.dispatchEvent(new ToggleEvent("toggle", this.isToggled));

      const parentElement = this.getParentElement();

      if(parentElement) {
        const overlayContainerStopEventDiv = parentElement.querySelector('.ol-overlaycontainer-stopevent') as HTMLDivElement;
        if(this.isToggled) {
          overlayContainerStopEventDiv.style.zIndex='unset';
          createChildIfNotExist(overlayContainerStopEventDiv, 'div', 'bgis-overlay-bg');
        } else {
          overlayContainerStopEventDiv.style.zIndex='0';
          removeChildrenIfExist(overlayContainerStopEventDiv, 'bgis-overlay-bg');
        }
      }

      if(this.isToggled) {
        if(this.unicodeToggled!==null) {
          this.setButtonUnicode(this.unicodeToggled);
        } else if(this.iconClassNameToggled!==null) {
          this.setButtonIconClassName(this.iconClassNameToggled);
        }
      } else {
        if(this.unicode!==null) {
          this.setButtonUnicode(this.unicode);
        } else if(this.iconClassName !== null) {
          this.setButtonIconClassName(this.iconClassName);
        }
      }

      toggleClass('.' + this.containerToToggle.getStyleClass(), 'show', parentElement || document);
    }
    return true;
  }

  /**
   * A setter for the toggled state of the button
   * @param isToggled
   */
  public set isToggled(isToggled: boolean) {
    this._isToggled = isToggled;
  }

  /**
   * A getter for the toggled state of the button
   */
  public get isToggled(): boolean {
    return this._isToggled;
  }

  /**
   * A getter for the container to toggle
   */
  public getContainerToToggle(): Container {
    return this.containerToToggle;
  }

  /**
   * Get the closest parent element for toggle.
   * For the core feature version it's the .bgis-map
   * For the full feature version it's the .bgis
   * @protected
   */
  protected getParentElement(): Element | null {
    let closestParent = this.element.closest('.bgis');
    if(!closestParent) {
      closestParent = this.element.closest('.bgis-map');
    }
    return closestParent;
  }
}
