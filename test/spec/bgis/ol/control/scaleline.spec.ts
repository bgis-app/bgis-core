import {ScaleLine} from "../../../../../src";

describe('bgis.ol.control.ScaleLine', () => {
  describe('constructor', () => {
    it('can be constructed without arguments', () => {
      const instance = new ScaleLine();
      expect(instance).toBeInstanceOf(ScaleLine);
    });
  });
});
