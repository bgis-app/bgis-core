import Control, {Options} from 'ol/control/Control';
import PluggableMap from "ol/PluggableMap";

/**
 * Abstract base class for Controls with child controls
 *
 * The element property of the CompositeControl will become the target element of every child control
 * and also the current map will be set for each child control
 *
 * This is used e.g. for the (layout) container controls
 */
export abstract class CompositeControl extends Control {

  /**
   * The child controls
   * @protected
   */
  protected childControls: Control[];

  /**
   *
   * @param childControls A single child control or a collection of child controls
   * @param options The OpenLayer control options
   */
  protected constructor(childControls: Control | Control[], options?: Options) {

    const opts = options ? options : {};

    if(!opts.element) {
      const element = document.createElement('div') as HTMLDivElement;
      element.className = 'bgis-composite';
      opts.element = element;
    }

    let children;
    if (childControls instanceof Control) {
      children = [childControls];
    } else {
      children = childControls;
    }

    children.forEach(control => {
      control.setTarget(opts.element as HTMLElement);
    });

    super(opts);

    this.childControls = children;
  }

  /**
   * The overriden setMap method
   *
   * Here we set the map for all child controls
   * @param map the current map
   */
  setMap(map: PluggableMap): void {
    super.setMap(map);
    if(map) {
      this.childControls.forEach(control => {
        control.setMap(map);
      });
    }
  }

  /**
   * A getter for the child controls
   * @protected
   */
  public getChildControls(): Control[] {
    return this.childControls;
  }
}
