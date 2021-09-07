import Control from "ol/control/Control";
import {Container} from "./Container";
import {ToggleButton, ToggleEvent} from "../base";
import BaseEvent from "ol/events/Event";
import {ObjectOnSignature} from "ol/Object";
import {OnReturn} from "ol/Observable";

/**
 * Options for the {@linkcode BottomRight} container
 */
export interface Options {
  /** An array of horizontal child controls **/
  horizontalControls: Control[],
  /** An array of vertical child controls **/
  verticalControls?: Control[]
}

/**
 * The extended signature for the on method
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BottomRightOnSignature<Return> = ((type: "toggle" | "toggle"[], listener: (event: ToggleEvent) => any) => Return) & ObjectOnSignature<Return>;

/**
 * A {@linkcode Container} for diplay on the bottom right corner.
 * We have horizonatl controls and vertical controls. The visibility of vertical
 * controls is controlled by a {@linkcode ToggleButton}
 */
export class BottomRight extends Container {

  /** The {@linkcode ToggleButton} which toggles the visibility of the vertical controls **/
  private readonly toggleButton: ToggleButton | null;

  /**
   * @override
   */
  public on!: BottomRightOnSignature<OnReturn>;

  /**
   *
   * @param options The options
   * @event ToggleEvent The event fired when the {@linkcode ToggleButton} is clicked
   */
  constructor(options: Options) {

    let toggleButton = null;
    if(options.verticalControls && options.verticalControls.length>0) {
      const containerToToggle = new Container({ styleClass: 'bgis-bottom-right-vertical', childControls: options.verticalControls});
      toggleButton = new ToggleButton({ containerToToggle, containerClassName: 'ol-control bgis-control bgis-bottom-right-overlay', unicode: 0xe907, unicodeToggled: 0xe924, tooltip: 'mehr...' });
      options.horizontalControls.push(toggleButton);
    }
    const opts = options ? options :{};
    super({...opts , styleClass: 'bgis-bottom-right-horizontal', childControls: options.horizontalControls });

    this.toggleButton = toggleButton;
    if(this.toggleButton!=null) {
      this.toggleButton.addEventListener("toggle", (event): boolean => {
        this.dispatchEvent(event as BaseEvent);
        return true;
      });
    }

  }

  /**
   * A getter for the {@linkcode ToggleButton}
   */
  public getToggleButton(): ToggleButton | null {
    return this.toggleButton;
  }

}
