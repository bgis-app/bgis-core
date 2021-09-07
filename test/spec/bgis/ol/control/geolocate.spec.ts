import {Button, GeoLocate} from "../../../../../src";
import {setupStaticImageExample, tearDownStaticImageExample} from "../../../../helpers";
import {expect} from "@jest/globals";

describe('bgis.ol.control.GeoLocate', () => {
  describe('constructor', () => {
    it('can be constructed without arguments', () => {
      const instance = new GeoLocate();
      expect(instance).toBeInstanceOf(Button);
    });
  });

  it('can handle change:position with ol GeoLocation', () => {
    const geoLocate = new GeoLocate();
    const map = setupStaticImageExample([geoLocate]);
    const olGeoLocation = geoLocate.geoLocation;
    const onSpy = jest.fn();
    olGeoLocation.on('change:position', () => onSpy());
    olGeoLocation.dispatchEvent('change:position');
    expect(onSpy).toHaveBeenCalled();
    tearDownStaticImageExample();
    onSpy.mockRestore();
  });

  it('can handle change:position on click', () => {

    const watchPositionSpy = jest.fn()
      .mockImplementationOnce((success) => Promise.resolve(success({
        coords: {
          latitude: 51.1,
          longitude: 45.3
        }
      })));

    const mockGeolocation = {
      watchPosition: watchPositionSpy
    };
    // @ts-ignore
    global.navigator.geolocation = mockGeolocation;

    const geoLocate = new GeoLocate();
    setupStaticImageExample([geoLocate]);
    geoLocate.dispatchEvent('click');
    expect(watchPositionSpy).toHaveBeenCalled();
    tearDownStaticImageExample();
    watchPositionSpy.mockRestore();
  });
});
