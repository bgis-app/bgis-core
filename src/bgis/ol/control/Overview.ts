import {Map, MapEvent} from "ol";
import Control, {Options} from 'ol/control/Control';
import {Coordinate} from "ol/coordinate";
import {boundingExtent, Extent} from "ol/extent";
import {ObjectOnSignature} from "ol/Object";
import BaseEvent from "ol/events/Event";
import {EventsKey} from "ol/events";

/**
 * The overview options for the {@link Overview} control
 */
export interface OverviewOptions extends Options {
  preventDefault?: boolean
}

/**
 * An event class to handle mouse events of the {@link Overview} control
 */
export class OverviewMapEvent extends BaseEvent {
  originalEvent: MouseEvent;
  constructor(type: string, originalEvent: MouseEvent) {
    super(type);
    this.originalEvent = originalEvent;
  }
}

/**
 * The extended signature for the on method of the {@link Overview} control
 */
export type OverviewOnSignature<Return> = ((type: "click" | "click"[], listener: (event: OverviewMapEvent) => unknown) => Return) & ObjectOnSignature<Return>;

/**
 * Displays an overview map of Austria and a crosshair marker for the current
 * center in the main map. You can click on the overview map to recenter the
 * main map.
 *
 * Hint: the default size of the overview map depends on the width of the viewport (appropriate for fullscreen maps).
 * To limit the size add a max-width and max-height (max-width = 1.75*max-height) to the .bgis-overview-image css class.
 */
export class Overview extends Control {

  /**
   *
   */
  static BACKGROUND_COLOR = '#e5ecf0';

  /**
   *
   */
  static SVG_HEIGHT = 216;

  /**
   *
   */
  static SVG_WIDTH = 380;

  /**
   *
   */
  static SVG_CODE = "<svg xmlns='http://www.w3.org/2000/svg' class='bgis-overviewmap-svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 " + Overview.SVG_WIDTH + " " + Overview.SVG_HEIGHT + "' preserveAspectRatio='xMidYMid meet' height='100%' width='100%' color-interpolation='auto' fill='black' fill-opacity='1'  stroke='black' stroke-dasharray='none' stroke-dashoffset='0' stroke-linecap='square' stroke-linejoin='miter' stroke-miterlimit='10' stroke-opacity='1' stroke-width='1' xmlns:v='https://vecta.io/nano'><style><![CDATA[.B{clip-path:url(#A)}.C{fill-rule:evenodd}.D{stroke:none}.E{fill:#999}.F{fill:none}.G{stroke-miterlimit:1}.H{stroke-width:2.5}]]></style><defs><clipPath id='A'><path d='M0 0h380v216H0V0z'/></clipPath><path id='B' d='M356 82l-.4 5.2 4.4 1.6-3.2 2.4v6.4l-3.6.8 2.8 3.6.8 6.8-9.6 1.2-.4-2-1.6 2.4h-3.6l-1.6-3.6-4.8-1.6-8 6.4 6.4 3.2 3.2-.8 1.2 4.8 2 .8-2.8 2.8.4 3.2-3.6 3.2-2.8-.4-.8 1.6-2.4-1.6-.4 4 2.4 4.8-2.4 1.6-.8 4 2 .8-.4 2.4 2.8-.4.8 1.6-3.2 1.6 2.8 2.8-4 2 3.6 1.6-10-.8-.4 3.2-4 1.6-2.4 4.4-6.4 2.8.8-3.6 6.4-6.8-3.2-5.2 1.6-4.8-4.8-14.8 13.2-6.8v-6l2.8-4-.8-3.6-2.4-1.2-1.2-7.6 3.2.8 2-2.8-2-1.6 2.8-.8 2-4 3.2-.4 2.4 4 5.6-5.6v-2.8l5.6-1.2 2.4-3.2L352 88l1.6-3.6-2-2 2.8 1.6 1.6-2z'/><path id='C' d='M162.4 146.8l.4 2 8.4 1.2 1.6 2.8 4.4 1.6 8-2 .4-2.8 4.8-.8 2 2 10.8.8 8.4 9.6 5.6-2 2.4-4 8.4-4.8 1.6 3.2h6l.8 3.2 4.8-3.2 5.6 2 10-3.6 8 8.8-2 8.8 2.4.8-.4 6.4 2 1.2-3.6 3.2-1.2-2-1.6 2-2.4-.4-2.4 6.4-4.8.8-.4 2.4-4.8 1.6-.8 4-2.4-3.6-2 1.2-2-2.4-12.4.8-1.2-2.8h-5.2l-4-2.8-5.6 1.2-18-4.8-6.8 1.6-6.4-3.2H168l-2.4-2.8-4.8-.4v-3.2h1.6V172l9.2-1.2 1.6-2.4-5.6-4v-3.2l-4.4-3.2-.8-2.4 2-3.2h-2.8l-2.4-3.6 3.2-2z'/><path id='D' d='M264.8 20.8l5.6 1.6.4 4 4.4-.8 1.6-2.8 8.8 3.2.8 2 8 4 6.8-1.6V32l5.2 2 .4 2.4 5.6 3.2 12.8 1.2 3.6-5.6 3.6-.4 2.4 2.4 2.8-.4 1.2 4 10.4 1.6 1.6 10.8-4.8 6-.8 4.8 5.6 7.6.8 6.4 4.4 3.2-1.6 2.8-2.8-1.6 2 2L352 88l-4.4-3.6-2.4 3.2-5.6 1.2v2.8l-5.6 5.6-2.4-4-3.2.4-1.6 3.6-3.2 1.2 2 1.2-2 3.2-3.2-.8 1.2 7.6 2.4 1.2.8 3.6-2.8 4 1.2 4-5.2 5.2h-2.8l-2-6.8-2.4 2.8-1.2-2-4.8-.8-1.2-2.8-2 .4.4-4-5.2-.4-1.2-5.6-1.6 1.2-3.2-3.6-4.4.4v-1.6H284l-4.4-4-2.4.4-.4 2-3.2-.4-.8 3.2-10.4.4-2 2.4-4-2.4-3.2 1.2-2.4-4v-4.4l2.8-1.6-.4-1.6-1.6-2.4-1.6.8-8.4-4.4-2-3.2v-3.6l1.6-.8-.8-6.4 2-2.4 6.8 5.2 7.2-2L258 74h3.2l1.2 2.4.8-8.4h-2l.8-4.8-2 .4 1.6-1.6-4-4.8 2.8-1.6-10.4-5.2 1.6-7.2 3.6-2.8.4-3.6 7.2 1.2V23.2l2-2.4zm62 47.2l-7.2 5.6-2.4-1.6-.8 6 1.6 3.2 9.6.4 2-2.8 4.4 1.6-2-2.4.8-6-2-2-1.6 1.2-2.4-3.2z'/><path id='E' d='M212.4 38l9.6 6.4-2.4 2 2.4 3.2h6l6.4 2.8 2-2.8h2.4L240 46l4 3.2 2.4-2 5.6 5.2 7.2 2 1.2 1.2-2.8 1.6.4 2 3.6 2.8-1.6 1.6 2-.4-.8 4.8h2v4.4l-.8 4-1.2-2.4H258l-1.6 2.8-6 2-6.8-5.2-3.2 2.4.8 6.4-1.6.8v3.6l6.4 6 5.6.8 2 3.2-2.8 2.4 1.6 6.8-2.4-.8-2 2.4-5.2.8-.8 2.4-8.4 4.8-3.2-.4-2-2.8-6.8 2.4v-3.6l-2-2-10.4-1.2-3.6 5.6 2.8 8.4-1.6 3.2h-2.4l-8.4-4 2-6.4-1.6-2 2.8-4.4-5.2-2 1.2-2.8 3.2.8v-1.6l-6.4.4-4.4-2-.4-8.8 3.6 1.2.4-2.8-4-2-6 2.8v-2l-3.2-.4-1.2-2.4h-4.4l-3.2 3.2-5.2-5.2-.4-3.2 12-9.6 14-4 4.8-7.2-.4-8.8 2 .4 1.2-2.4 10 5.2 4.4-7.2.4-5.6-2-.8 2.4-3.6z'/><path id='F' d='M176.4 86.8l1.6 2.4 3.2.4v2l6-2.8 4 2-.4 2.8-3.6-1.2.4 8.8 11.2 2.4h-3.6l-1.2 3.2 5.2 1.6-2.8 4.4 1.6 2-2 6.4 5.2 3.2-1.6 3.2 1.6 8.8 5.2 2 5.2-2.4.8 4.4 6.8 6.4-5.2 1.2 1.2 2.8-4.4 8-5.2-3.6v-2.4l-10.4-2.8-2.8.8-1.6-2-5.2.8-.4 2.8-7.2 2-5.2-1.6-1.6-2.8-8.4-1.2v-2l-4 2-6-3.6H148l-6.4 5.6-6-1.2-2-12.8 1.6-1.6 6.8.4 1.2-2 8.4.4v-3.6l4.4-.8 2.4-4.8 2.8-.8-3.2-4.8 2-2-4.4-1.6 1.2-4.4h8.4l-1.2 1.6 2.8 2.4-2 2 .8 2 7.6 5.2 3.6-1.2-.4-5.6 2.8-3.6-.8-4-2.4-2h-5.6l4.4-9.2-6.4-8.4 4-3.6h4z'/><path id='G' d='M279.2 101.2l7.2 3.6v1.6l4.4-.4 3.2 3.6 1.6-1.2 1.2 5.6 5.2.4-.8 3.2 2.4.4 1.2 2.8 4.8.8 1.2 2 1.6-2.8 1.2.8-.4 2.8 2.8 3.2-7.2 3.6 4.8 14.8-1.6 4.8 3.2 4.8-7.6 10.8v6l2.4 5.2-6.8-4h-3.6l-9.6 2-2 1.2v2.8l-3.2 1.2-2.8-3.2-14.8.8-2.4-1.6.4-6.4-2.4-.8 2-8.8-8-8.8-10 3.6-5.6-2-4.8 3.2-.8-3.2h-6l-1.6-3.2-8.4 4.8-2.4 4-4.4 2-3.2-1.6 5.6-8.8-1.2-2.8 5.2-1.2-6.8-6.4-.8-4.4-5.2 2.4-4.8-1.6-2-8.4 1.6-4.4 5.6 1.2 1.6-3.2-2.8-8.4 3.6-5.6 10.4 1.2 2 2v3.6l6.8-2.4 2 2.8 3.2.4 16.4-10.4 3.2 2.4 3.2-1.2 4 2.4 2-2.4 10.4-.4.8-3.2 3.2.4.4-2h2z'/><path id='H' d='M151.6 145.2l6.4 2.4 3.6 4.8h2.8l-2 3.2.8 2.4 4.4 3.2v3.2l5.6 4-1.6 2.4-9.2 1.2-1.6 5.6-5.6.4-8-4-1.2-4-3.2-.4-.4-6.8-2.8.8-3.2-2.8 1.2-1.6-2-4.8 3.6-.8 7.2-7.6 5.2-.8z'/><path id='I' d='M61.2 118.8l5.6 1.6 2-2.4 6.8 3.6 5.2-1.6 1.2 1.6-2.4 2h3.2l2 6h6l4-2.8 2 .4-.8 2.4 2.4-.4 2-3.2 4 .4-1.6-2.4 2.4-2.8 6 .4 2.4-5.2 9.6.8 6.8-2.8 9.2 1.2-2-6.4 4.4-2.8v4.4l8-1.2 2.8 4.8 3.2-.8v2l4 1.2-1.6 2.4 3.2 4.8-2.8.8-2.4 4.8-4.4.8v3.6l-8.4-.4-1.2 2-6.8-.4-1.6 1.6 2.4 13.6-8 2-9.2 5.2-5.2-3.2-3.6 2-3.2-1.6-2.4 2.8-2.4-1.6-9.2 1.6.4 1.6-3.2 1.6-3.2 10h-7.2l-6-1.6 1.6-2.4-4-3.2L66 166l-4-1.2.8-5.6-2.8-.8-1.6-3.2-3.6 3.2.4 2-3.6-.4v4l-4 1.2-1.6-2.8-.4-2.4 2.8-3.6-2-2.4 1.6-1.2-1.2-2.8 4-4 .4-7.2-2.4-1.2 6.8-2 4.8-5.2 2-3.2-2-4 .8-4.4z'/><path id='J' d='M31.2 116.4l2 .4-.4 2.8h6.8l1.2 4 4.4 1.6.4 2.4-1.6.8 1.6 3.6 6-2-.8 5.2-2 1.2 2.4 2.4-.4 7.2-4 4 1.2 2.8-1.6 1.2 2 2.4-2.8 3.6 2 3.6-1.2 2-3.2-1.2-1.2-2.8-6.4-2V154l-12-2.4 1.2-4.8-3.2-2.4.4-4.8-2-2 6.4-8-.4-4-2.8-.4-1.6-2.8 7.6-2 2-4z'/><path id='K' d='M327.6 68.4l.4 2 2.8-.4 2 2-.8 6 2 2.4-4.4-1.6-2 2.8-9.6-.4-1.6-3.2.8-6 2.4 1.6 1.6-2.4 3.6-.4.4-2.8 2.4.4z'/></defs><g text-rendering='optimizeLegibility'><use xlink:href='#B' class='B C D E'/><g stroke='silver'><use xlink:href='#B' class='B F G H'/><use xlink:href='#C' class='B C D E'/><use xlink:href='#C' class='B F G H'/><use xlink:href='#D' class='B C D E'/><use xlink:href='#D' class='B F G H'/><use xlink:href='#E' class='B C D E'/><use xlink:href='#E' class='B F G H'/><use xlink:href='#F' class='B C D E'/><use xlink:href='#F' class='B F G H'/><use xlink:href='#G' class='B C D E'/><use xlink:href='#G' class='B F G H'/><use xlink:href='#H' class='B C D E'/><use xlink:href='#H' class='B F G H'/><path d='M61.2 118.8l-1.2-1.2 2.4-.8-1.2 2z' class='B C D E'/><path d='M61.2 118.8l-1.2-1.2 2.4-.8-1.2 2z' class='B F G H'/><use xlink:href='#I' class='B C D E'/><use xlink:href='#I' class='B F G H'/><use xlink:href='#J' class='B C D E'/><use xlink:href='#J' class='B F G H'/><use xlink:href='#K' class='B C D E'/><use xlink:href='#K' class='B F G H'/></g></g></svg>";

  /**
   * APIProperty: extent
   * Extent of overview - [minx, miny, maxx, maxy] or [left, bottom, right, top]
   */
  protected extent: Extent;

  /**
   *
   * @protected
   */
  protected svgElement: SVGElement;

  /**
   *
   * @protected
   */
  protected overviewContainerElement: HTMLDivElement;

  /**
   *
   * @protected
   */
  protected backgroundSVGRectElement: SVGRectElement;

  /**
   *
   * @private
   */
  protected preventDefault: boolean;

  /**
   * @override
   */
  public on!: OverviewOnSignature<EventsKey>;

  /**
   *
   * @param options the overview options
   */
  constructor(options?: OverviewOptions) {

    const opts = options || {} as OverviewOptions;

    const overviewContainerElement = document.createElement('div') as HTMLDivElement;
    overviewContainerElement.className = 'bgis-overview-image';

    const figureElement = document.createElement('figure');
    figureElement.innerHTML = Overview.SVG_CODE;

    overviewContainerElement.appendChild(figureElement);

    opts.element = overviewContainerElement;

    super(opts);

    this.preventDefault = opts.preventDefault || false;

    this.overviewContainerElement = overviewContainerElement;

    // extent: [minx, miny, maxx, maxy] -- coordinates: [[left, bottom], [right, top]]
    this.extent = boundingExtent([[1010000, 5790000], [1960000, 6330000]]);

    this.overviewContainerElement.addEventListener("click", (e) => this.dispatchEvent(new OverviewMapEvent('click', e)), false);

    if(!this.preventDefault) {
      this.on("click", this.onOverviewImageClick);
    }

    this.svgElement = figureElement.firstChild as SVGElement;

    this.backgroundSVGRectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    this.backgroundSVGRectElement.setAttribute('class', 'bgis-overviewmap-svg-background');
    this.backgroundSVGRectElement.setAttribute('x', String(0));
    this.backgroundSVGRectElement.setAttribute('y', String(0));
    this.backgroundSVGRectElement.setAttribute('rx', String(8));
    this.backgroundSVGRectElement.setAttribute('ry', String(8));
    this.backgroundSVGRectElement.setAttribute('width', String(Overview.SVG_WIDTH));
    this.backgroundSVGRectElement.setAttribute('height', String(Overview.SVG_HEIGHT));
    this.backgroundSVGRectElement.setAttribute('style', 'stroke-width:0');
    this.backgroundSVGRectElement.setAttribute('fill', Overview.BACKGROUND_COLOR);

    this.svgElement.prepend(this.backgroundSVGRectElement);
  }

  /**
   *
   * @param map
   */
  public setMap(map: Map): void {
    super.setMap(map);
    if (map) {
      // if(this.svgElement) {
      //   this.svgElement.prepend(this.svgBackgroundRect);
      // }
      if(!this.preventDefault) {
        map.on('moveend', (event: MapEvent) => this.updateCrosshair(event));
      }

    }
  }

  /**
   *
   * @private
   */
  protected updateCrosshair(event: MapEvent): void {

    const size = [Overview.SVG_WIDTH, Overview.SVG_HEIGHT];

    const center = this.getOverviewPxFromLonLat(event.map.getView()?.getCenter());

    // just to be sure make some limits
    if (center[0] > size[0])
      center[0] = size[0];
    else if (center[0] < 0)
      center[0] = 0;

    if (center[1] > size[1])
      center[1] = size[1];
    else if (center[1] < 0)
      center[1] = 0;

    // update crosshair
    if (this.svgElement) {
      const existingElms = this.svgElement.getElementsByClassName('bgis-overviewmap-svg-crosshair') as HTMLCollectionOf<SVGLineElement>;
      if (existingElms) {
        for (const existingElm of Array.from(existingElms)) {
          this.svgElement.removeChild(existingElm);
        }
      }
      this.svgElement.appendChild(Overview.getCrosshair(center[0], 0, center[0], Overview.SVG_HEIGHT, 'bgis-overviewmap-svg-crosshair-x'));
      this.svgElement.appendChild(Overview.getCrosshair(0, center[1], Overview.SVG_WIDTH, center[1], 'bgis-overviewmap-svg-crosshair-y'));
    }

  }

  /**
   *
   * @param x1
   * @param y1
   * @param x2
   * @param y2
   * @param cssClass
   * @private
   */
  public static getCrosshair(x1: number, y1: number, x2: number, y2: number, cssClass: string): SVGLineElement {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', String(x1));
    line.setAttribute('y1', String(y1));
    line.setAttribute('x2', String(x2));
    line.setAttribute('y2', String(y2));
    line.setAttribute('style', 'fill: none; stroke: black; stroke-width: 1px;');
    line.setAttribute('class', 'bgis-overviewmap-svg-crosshair ' + cssClass);
    return line;
  }

  /**
   *
   * @param left
   * @param right
   * @param width
   * @private
   */
  public static calculateResolutionFromWidth(left: number, right: number, width: number): number {
    return Math.abs((left - right)) / width;
  }

  /**
   *
   * @param center
   * @private
   */
  protected getOverviewPxFromLonLat(center: Coordinate | undefined): number[] {
    if (center) {
      const size = [Overview.SVG_WIDTH, Overview.SVG_HEIGHT];
      const resolution = [
        Overview.calculateResolutionFromWidth(this.extent[0], this.extent[2], size[0]),
        Overview.calculateResolutionFromWidth(this.extent[1], this.extent[3], size[1])
      ];
      return [
        Math.round(1 / resolution[0] * (center[0] - this.extent[0])),
        Math.round(1 / resolution[1] * (this.extent[3] - center[1]))
      ];
    }
    return [0, 0];
  }

  /**
   * Method: onOverviewImageClick
   * Handle click in overview image
   *
   * Parameters:
   * e - MouseEvent object
   */
  protected onOverviewImageClick(e: OverviewMapEvent): void {

    const overviewContainerClientBoundingRect = this.overviewContainerElement.getBoundingClientRect();
    const x = e.originalEvent.clientX - overviewContainerClientBoundingRect.left; // X-pos in overview image
    const y = e.originalEvent.clientY - overviewContainerClientBoundingRect.top; // Y-pos in overview image

    // get LonLat
    const clickLonLat = this.getLonLatFromOverviewPx([x, y]);

    // update center of the map
    this.getMap()?.getView()?.animate({
      center: clickLonLat,
      duration: 300,
    });

  }

  /**
   * Method: getLonLatFromOverviewPx
   * Get map location from pixel location
   *
   * Parameters:
   * oPx - Coordinate
   *
   * Returns:
   * [x,y] Location in lon/lat translated from
   * passed in pixel-location in overview map
   */
  protected getLonLatFromOverviewPx(oPx: Coordinate): number[] {

    const size = [this.overviewContainerElement.clientWidth, this.overviewContainerElement.clientHeight];
    const resolution = [
      Overview.calculateResolutionFromWidth(this.extent[0], this.extent[2], size[0]),
      Overview.calculateResolutionFromWidth(this.extent[1], this.extent[3], size[1])
    ];

    return [
      oPx[0] * resolution[0] + this.extent[0],
      this.extent[3] - oPx[1] * resolution[1]
    ];
  }

  /**
   * Get the overview parent container element
   */
  public getOverviewContainerElement(): HTMLDivElement {
    return this.overviewContainerElement;
  }

  /**
   * Get the overview svg element
   */
  public getSVGElement(): SVGElement {
    return this.svgElement;
  }

  /**
   * Get the svg background rect element
   */
  public getBackgroundRectElement(): SVGRectElement {
    return this.backgroundSVGRectElement;
  }

}
