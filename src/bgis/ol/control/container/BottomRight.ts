import Control from "ol/control/Control";
import {Container} from "./Container";
import {ToggleButton, ToggleEvent} from "../base";
import BaseEvent from "ol/events/Event";
import {ObjectOnSignature} from "ol/Object";
import {EventsKey, listen} from "ol/events";
import EventType from "ol/events/EventType";
import {Map} from "ol";
import cssVariables from "../../_index.scss";

/**
 * Options for the {@link BottomRight} container
 */
export interface BottomRightOptions {
  /** An array of horizontal child controls **/
  horizontalControls: Control[],
  /** An array of vertical child controls **/
  verticalControls?: Control[]
}

/**
 * The extended signature for the on method of the {@link BottomRight} container
 */
export type BottomRightOnSignature<Return> =
  ((type: "toggle" | "toggle"[], listener: (event: ToggleEvent) => unknown) => Return)
  & ObjectOnSignature<Return>;

/**
 * A {@link Container} for display in the bottom right corner.
 * We have horizontal controls and vertical controls. The visibility of vertical
 * controls is controlled by a {@link ToggleButton}
 */
export class BottomRight extends Container {

  /** The key for the "moved from horizontal" flag property **/
  static MOVED_FROM_HORIZONTAL_KEY = 'bgis-moved-from-horizontal';

  /**
   * @override
   */
  public on!: BottomRightOnSignature<EventsKey>;

  /** The {@link ToggleButton} which toggles the visibility of the vertical controls **/
  protected toggleButton: ToggleButton | null;

  /** The horizontal controls **/
  protected horizontalControls: Control[] = [];

  /**
   *
   * @param options The options
   * @event ToggleEvent The event fired when the {@link ToggleButton} is clicked
   */
  constructor(options: BottomRightOptions) {

    let toggleButton = null;

    if (options.verticalControls && options.verticalControls.length > 0) {
      toggleButton = BottomRight.createToggle(options.verticalControls);
      options.horizontalControls.push(toggleButton);
    }

    const opts = options ? options : {};
    super({...opts, styleClass: 'bgis-bottom-right-horizontal', childControls: options.horizontalControls});

    this.horizontalControls = options.horizontalControls;

    this.toggleButton = toggleButton;
    if (this.toggleButton != null) {
      this.toggleButton.addEventListener("toggle", (event): boolean => {
        this.dispatchEvent(event as BaseEvent);
        return true;
      });
    }

  }

  /**
   * A getter for the {@link ToggleButton}
   */
  public getToggleButton(): ToggleButton | null {
    return this.toggleButton;
  }

  /**
   *
   * @param map
   */
  public setMap(map: Map): void {
    const defaultView = map.getOwnerDocument().defaultView;
    if(defaultView) {
      listen(defaultView, EventType.RESIZE, () => {
        this.handleHorizontalControlsForSize();
      }, this);
    }
    super.setMap(map);
    this.handleHorizontalControlsForSize();
  }

  /**
   * The handler for moving the horizontal controls depending on the client width
   * @protected
   */
  protected handleHorizontalControlsForSize(): void {
    const map = this.getMap();
    if(map) {
      const documentWidth: number = map.getOwnerDocument().documentElement.clientWidth;
      if(documentWidth >= cssVariables.desktopMinWidth) { // desktop
        if(this.toggleButton?.getContainerToToggle()) {
          const ctlsToMove = this.toggleButton.getContainerToToggle().getChildControls().filter(ctl => ctl.get(BottomRight.MOVED_FROM_HORIZONTAL_KEY)===true);
          if(ctlsToMove.length>0) {
            this.getElement().innerHTML = '';
            ctlsToMove.forEach(ctl => {
              ctl.unset(BottomRight.MOVED_FROM_HORIZONTAL_KEY);
              ctl.setTarget(this.getElement());
              ctl.setMap(map);
            });
            this.horizontalControls = ctlsToMove;
            this.toggleButton.getContainerToToggle().setChildControls(this.toggleButton.getContainerToToggle().getChildControls().filter(ctl => !ctlsToMove.includes(ctl)));

            // if there are controls left in the toggle button
            // then recreate the toggle button
            if(this.toggleButton.getContainerToToggle().getChildControls().length>0) {
              const isToggled = this.toggleButton.isToggled;
              const toggleButton = BottomRight.createToggle(this.toggleButton.getContainerToToggle().getChildControls());
              toggleButton.setTarget(this.getElement());
              toggleButton.setMap(map);
              this.toggleButton = toggleButton;
              this.horizontalControls.push(toggleButton);
              if(isToggled) {
                this.toggleButton.handleEvent(new BaseEvent(EventType.CLICK));
              }
            } else {
              this.toggleButton = null;
            }

          }
        }
      } else { // mobile
        const ctlsToMove = this.horizontalControls.filter(ctl => !(ctl instanceof ToggleButton) && ctl.get(BottomRight.MOVED_FROM_HORIZONTAL_KEY)!==true);
        if(this.toggleButton?.getContainerToToggle().getChildControls()
          && this.toggleButton?.getContainerToToggle().getChildControls().length>0 || ctlsToMove.length>1) {
          if(!this.toggleButton?.getContainerToToggle()) {
            this.toggleButton = BottomRight.createToggle([]);
            this.toggleButton.setTarget(this.getElement());
            this.toggleButton.setMap(map);
          }
          ctlsToMove.forEach(ctl => {
            ctl.set(BottomRight.MOVED_FROM_HORIZONTAL_KEY, true);
            if(this.toggleButton) {
              ctl.setTarget(this.toggleButton.getContainerToToggle().getElement());
            }
            ctl.setMap(map);
          });
          this.toggleButton?.getContainerToToggle().getChildControls().push(...ctlsToMove);
          this.horizontalControls = this.horizontalControls.filter(ctl => !ctlsToMove.includes(ctl));
        }
      }
    }
  }

  /**
   * Creates the {@link ToggleButton} to toggle a {@link Container}
   * with the give controls inside
   * @param verticalControls
   */
  protected static createToggle(verticalControls: Control[]): ToggleButton {
    const containerToToggle = new Container({
      styleClass: 'bgis-bottom-right-vertical',
      childControls: verticalControls
    })
    return new ToggleButton({
      containerToToggle,
      containerClassName: 'ol-control bgis-control bgis-bottom-right-overlay',
       iconClassName : 'bgis-icon-more-four',
       iconClassNameToggled:'bgis-icon-times',
      tooltip: 'mehr...'
    });
  }

}
