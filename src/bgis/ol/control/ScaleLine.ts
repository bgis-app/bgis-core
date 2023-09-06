import {MapEvent} from "ol";
import {State} from "ol/View";
import {Control} from "ol/control";
import {getPointResolution} from "ol/proj";
import {Units} from "ol/control/ScaleLine";
import cssVariables from "../_index.scss";

/**
 * @type {string}
 */
const UNITS_PROP = 'units';

/**
 * 25.4mm = 1 inch
 * 0.28mm = pixel size according to the OGC WMTS specification
 *
 * @const
 * @type {number}
 */
export const DISPLAY_DPI = 25.4 / 0.28; // ~90.714

/**
 * @const
 * @type {Array<number>}
 */
const LEADING_DIGITS = [1, 2, 5];

/**
 * ScaleLine options
 */
export interface ScaleLineOptions {

  /** A css class name **/
  className?: string;

  /** Specify a target if you want the control to be rendered outside of the map's viewport **/
  target?: HTMLElement | string;

  /** dpi of the output device **/
  dpi?: number;

  /** Minimum width in pixels at the OGC default dpi. The width will be adjusted to match the dpi used. **/
  minWidth?: number;
}

/**
 * Displays a scale line in the map.
 *
 * This control is an customized version of the OpenLayers Scaleline control.
 * Here the scaleline is a svg image, because now the client can export it
 * without 3rd party dependency (see our export example)
 */
export class ScaleLine extends Control {

  protected viewState: State | null;

  private _minWidth: number;

  protected renderedVisible: boolean;

  protected renderedWidth: number | undefined;

  protected renderedSVG: SVGElement | undefined;

  protected dpi: number | undefined;

  /**
   * Creates a new scaleline control.
   * ```typescript
   * // Example: create a new ScaleLine control with the default parameters.
   * const scaleLineControl = new ScaleLine();
   * ```
   * @param opt_options
   */
  constructor(opt_options?: ScaleLineOptions) {
    const options = opt_options ? opt_options : {};

    const className = options.className ? options.className : 'bgis-scaleline';

    super({
      element: document.createElement('div'),
      target: options.target,
    });

    this.viewState = null;

    this._minWidth = options.minWidth !== undefined ? options.minWidth : 64;
    this.renderedVisible = false;
    this.renderedWidth = undefined;
    this.renderedSVG = undefined;
    this.dpi = options.dpi || undefined;

    this.element.className = className;

  }

  /**
   * Update the scale line element
   * @param mapEvent
   */
  public render(mapEvent: MapEvent): void {
    const frameState = mapEvent.frameState;
    if (!frameState) {
      this.viewState = null;
    } else {
      this.viewState = frameState.viewState;
    }
    this.updateElement();
  }

  /**
   * The code is mainly copied from the OpenLayers Scaleline control
   * and customized for our svg element
   * @private
   */
  private updateElement(): void {

    const viewState = this.viewState;

    if (!viewState) {
      if (this.renderedVisible) {
        this.element.style.display = 'none';
        this.renderedVisible = false;
      }
      return;
    }

    const center = viewState.center;
    const projection = viewState.projection;
    const units = this.getUnits();
    const pointResolutionUnits = units == 'degrees' ? 'degrees' : 'm';
    let pointResolution = getPointResolution(
      projection,
      viewState.resolution,
      center,
      pointResolutionUnits
    );

    const minWidth = (this._minWidth * (this.dpi || DISPLAY_DPI)) / DISPLAY_DPI;

    const nominalCount = minWidth * pointResolution;
    let suffix;
    if (nominalCount < 0.001) {
      suffix = 'μm';
      pointResolution *= 1000000;
    } else if (nominalCount < 1) {
      suffix = 'mm';
      pointResolution *= 1000;
    } else if (nominalCount < 1000) {
      suffix = 'm';
    } else {
      suffix = 'km';
      pointResolution /= 1000;
    }

    let i = 3 * Math.floor(Math.log(minWidth * pointResolution) / Math.log(10));
    let count, width, decimalCount: number | undefined;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      decimalCount = Math.floor(i / 3);
      const decimal = Math.pow(10, decimalCount);
      count = LEADING_DIGITS[((i % 3) + 3) % 3] * decimal;
      width = Math.round(count / pointResolution);
      if (isNaN(width)) {
        this.element.style.display = 'none';
        this.renderedVisible = false;
        return;
      } else if (width >= minWidth) {
        break;
      }
      ++i;
    }

    let generatedSVG = null;
    if (count && decimalCount>=0) {
      generatedSVG = this.getGeneratedSVG(count.toFixed(decimalCount < 0 ? -decimalCount : 0) + ' ' + suffix, width);
    }

    if (generatedSVG && this.renderedSVG != generatedSVG) {
      this.element.innerHTML = '';
      this.element.appendChild(generatedSVG);
      this.renderedSVG = generatedSVG;
    }

    if (this.renderedWidth != width) {
      this.element.style.width = width + 'px';
      if(generatedSVG) {
        generatedSVG.setAttribute('width', String(width));
      }
      this.renderedWidth = width;
    }

    if (!this.renderedVisible) {
      this.element.style.display = '';
      this.renderedVisible = true;
    }

  }

  getUnits() {
    return this.get(UNITS_PROP) as Units;
  }

  /**
   * Get the generated svg element
   *
   * @param txt the calculated text content of the element
   * @param width the calculated output width
   * @private
   */
  protected getGeneratedSVG(txt: string, width: number): SVGElement {

    const svgHeight = 18;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('id', 'bgis-scaleline-svg');
    svg.setAttribute('viewBox', '0 0 ' + width + ' ' + svgHeight);
    svg.setAttribute('width', String(width));
    svg.setAttribute('height', '100%');

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('id', 'bgis-scaleline-svg-background');
    rect.setAttribute('x', String(0));
    rect.setAttribute('y', String(0));
    rect.setAttribute('width', '100%' /*String(width)*/);
    rect.setAttribute('height', '100%' /*String(svgHeight)*/);
    rect.setAttribute('fill', '#e5ecf0');
    rect.setAttribute('fill-opacity', '.5');
    rect.setAttribute('stroke', 'black');
    rect.setAttribute('stroke-width', '1');
    rect.setAttribute('stroke-dasharray', '0 ' + width + ' ' + (width + 2 * svgHeight));
    svg.appendChild(rect);

    const text: SVGTextElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.textContent = txt;
    text.setAttribute('x', String(width / 2));
    text.setAttribute('y', String(12));
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '1em');
    text.setAttribute('style', 'font-size: 0.75rem; font-family: ' + cssVariables.fontFamily);
    text.setAttribute('font-family', cssVariables.fontFamily);
    text.setAttribute('fill', 'black');
    svg.appendChild(text);

    return svg;
  }

  /**
   * Set the min width
   * @param value
   */
  public setMinWidth(value: number): void {
    this._minWidth = value;
  }

  /**
   * Get the min width
   */
  public getMinWidth(): number {
    return this._minWidth;
  }

}
