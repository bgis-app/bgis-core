import EventType from "ol/events/EventType";
import {createChildIfNotExist, removeChildrenIfExist, toggleClass} from "../../../util/dom";
import {Container} from "../container";
import {Button, ButtonOptions} from "./Button";
import BaseEvent from "ol/events/Event";

/**
 * The toggle event which is dispatched when the {@linkcode ToggleButton} is clicked
 */
export class ToggleEvent extends BaseEvent {

  /** A flag to show the status of a toggle event **/
  isToggled: boolean;

  /**
   *
   * @param type The event type. Usually a {@linkcode ToggleEventType}
   * @param isToggled The flag to show the state of the toggle
   */
  constructor(type: string, isToggled: boolean) {
    super(type);

    this.isToggled = isToggled;
  }
}

/**
 * The option for the {@linkcode ToggleButton}
 */
export interface ToggleButtonOptions extends ButtonOptions {
  /** The unicode of the font icon visible when the button is clicked **/
  unicodeToggled?: number,

  /** The css class name of the font icon visible when the button is clicked **/
  iconClassNameToggled?: string,

  /** The {@linkcode Container} which visibility get toggled **/
  containerToToggle: Container
}

/**
 * A {@linkCode Button} to toggle the visibility of a {@linkcode Container}
 */
export class ToggleButton extends Button {

  /** The {@linkcode Container} which visibility get toggled **/
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
   * The overriden handleEvent method
   * @override
   * @param event
   */
  public handleEvent(event: BaseEvent): boolean {
    if(event.type === EventType.CLICK) {
      this.isToggled = !this.isToggled;
      this.dispatchEvent(new ToggleEvent("toggle", this.isToggled));

      const parentElement = this.getParentElement();

      if(parentElement) {
        this.handleOverlayForElement(parentElement.querySelector('.ol-overlaycontainer-stopevent'));
      }

      this.handleOverlayOuter();

      if (this.isToggled) {
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
   * Creates and removes a overlay layer (for gray out) on an element
   * @param element The parent element for the overlay layer
   * @param className The style class name for the overlay layer
   * @protected
   */
  protected handleOverlayForElement(element: HTMLElement | null, className = 'bgis-overlay-bg'): void {
    if(this.element != null) {
      if(this.isToggled) {
        element?.classList.add('bgis-overlay-toggled-true');
        createChildIfNotExist(element, 'div', className);
      } else {
        element?.classList.remove('bgis-overlay-toggled-true');
        removeChildrenIfExist(element, className);
      }
    }
  }

  /**
   * Finds all elements in the DOM with *.bgis-toggled-overlayable* style class to gray them out
   * @protected
   */
  protected handleOverlayOuter(): void {
    const parentElement = this.getParentElement();
    if(parentElement) {
      const overlayableParents = parentElement.querySelectorAll('.bgis-toggled-overlayable');
      if(overlayableParents && overlayableParents.length>0) {
        overlayableParents.forEach((parent) => {
          this.handleOverlayForElement(parent as HTMLElement);
        });
      }
    }
  }

  /**
   * Get the closest parent element for toggle.
   * For the core feature version it's the .bgis-map
   * For the full feature version it's the .bgis-body
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
