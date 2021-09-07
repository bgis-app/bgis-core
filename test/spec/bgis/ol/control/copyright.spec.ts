import {Copyright} from "../../../../../src";

describe('bgis.ol.control.Copyright', () => {
  describe('constructor', () => {
    it('can be constructed without arguments', () => {
      const instance = new Copyright();
      expect(instance).toBeInstanceOf(Copyright);
    });
  });

  describe('constructor', () => {
    it('can be constructed with options', () => {
      const instance = new Copyright({ label: 'OUR COPYRIGHT' });
      expect(instance).toBeInstanceOf(Copyright);
    });
  });
});
