import Geolocation, {Options as OlGeoLocationOptions} from 'ol/Geolocation';
import {Button} from "./base";
import BaseEvent from "ol/events/Event";
import Event from "ol/events/Event";
import EventType from "ol/events/EventType";
import {ButtonOnSignature, ButtonOptions} from "./base/Button";
import {fromLonLat} from "ol/proj";
import {Coordinate} from "ol/coordinate";
import {OnReturn} from "ol/Observable";

/**
 * The extended signature for the on method
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GeolocateOnSignature<Return> = ((type: "location_retrieved" | "location_retrieved"[], listener: (event: LocationRetrievedEvent) => any) => Return) & ButtonOnSignature<Return>;

/**
 * The location retrieved event which is dispatched when we retrieve a position via the {@linkcode GeoLocate} button
 *
 * @TODO extend to retrieve more information from the Openlayers Geolocate object
 */
export class LocationRetrievedEvent extends Event {

  /** your current position **/
  position: Coordinate;

  /**
   *
   * @param type The event type. Usually a {@linkcode LocationRetrievedEventType}
   * @param position Your current position
   */
  constructor(type: string, position: Coordinate) {
    super(type);

    this.position = position;
  }
}


/**
 * A {@linkCode Button} to retrieve your current position
 *
 * This class uses the OpenLayers Geolocation object to fetch the current position.
 * When we retrieve the current position, a LocationRetrievedEvent is fired
 *
 */
export class GeoLocate extends Button {

  /** The OpenLayers Geolocation object **/
  protected _geoLocation: Geolocation;

  /**
   * @override
   */
  public on!: GeolocateOnSignature<OnReturn>;

  /**
   *
   * @param options
   */
  constructor(options?: ButtonOptions | OlGeoLocationOptions) {
    const opts = options || {};
    super({unicode: 0xe936, containerClassName: 'ol-control bgis-control ol-geolocate', tooltip: 'Standort zentrieren', ...opts });

    const geoLocationOptions = (options || {}) as OlGeoLocationOptions;
    this._geoLocation = new Geolocation(geoLocationOptions);

  }

  /**
   *
   * @override
   * @param event
   */
  public handleEvent(event: Event | BaseEvent): boolean {
    if(event.type === EventType.CLICK) {

      if(this.geoLocation && this.getMap()?.getView()?.getProjection()) {
        this.geoLocation.once('change', () => {
          this.geoLocation.setTracking(false);
          this.getMap().getView().animate({
            center: fromLonLat(this.geoLocation.getPosition() as number[]),
            duration: 300,
          });
          if(this.geoLocation.getPosition()) {
            this.dispatchEvent(new LocationRetrievedEvent("location_retrieved", this.geoLocation.getPosition()!));
          }
        });
        this.geoLocation.setTracking(true);
      }

    }
    return true;

  }

  /**
   * A getter for the OpenLayers Geolocation object
   */
  get geoLocation(): Geolocation {
    return this._geoLocation;
  }
}
