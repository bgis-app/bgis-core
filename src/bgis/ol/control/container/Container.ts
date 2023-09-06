import Control, {Options} from "ol/control/Control";
import {CompositeControl} from "../base";

/**
 * Options for a {@link Container}
 */
export interface ContainerOptions extends Options {
  /** The style class of the container **/
  styleClass: string
  /** A child control or an array of child controls **/
  childControls: Control | Control[],
}

/**
 * A base class for a container of controls in the same HTML div element
 *
 * This control creates a parent div, and puts the child controls in it.
 * Target and map are set automatically - see {@link CompositeControl}
 */
export class Container extends CompositeControl {

  /** The style class of the container **/
  private readonly styleClass: string;

  /**
   *
   * @param options The container options
   * @protected
   */
  constructor(options: ContainerOptions) {
    const element = options.element ? options.element : document.createElement("div");
    element.classList.add(options.styleClass);
    options.element = element;
    super(options.childControls, options);
    this.styleClass = options.styleClass;
  }

  /**
   * A getter for the style class
   */
  public getStyleClass(): string {
    return this.styleClass;
  }

}
