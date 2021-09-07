import {Zoom} from "../../../../../src";

describe('bgis.ol.control.Zoom', () => {
  describe('constructor', () => {
    it('can be constructed without arguments', () => {
      const instance = new Zoom();
      expect(instance).toBeInstanceOf(Zoom);
    });
  });
});
