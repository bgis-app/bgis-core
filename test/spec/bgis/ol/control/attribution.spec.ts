import {default as OlAttribution} from 'ol/control/Attribution';
import {Attribution} from "../../../../../src";

describe('bgis.ol.control.Attribution', () => {
  describe('constructor', () => {
    it('can be constructed without arguments', () => {
      const instance = new Attribution();
      expect(instance).toBeInstanceOf(OlAttribution);
    });
  });

  describe('constructor', () => {
    it('can be constructed with options', () => {
      const instance = new Attribution({ collapsed: true });
      expect(instance).toBeInstanceOf(OlAttribution);
    });
  });
});
