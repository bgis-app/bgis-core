import {default as OlMousePosition} from 'ol/control/MousePosition';
import {MousePosition} from "../../../../../src";

describe('bgis.ol.control.MousePosition', () => {
  describe('constructor', () => {
    it('can be constructed without arguments', () => {
      const instance = new MousePosition();
      expect(instance).toBeInstanceOf(OlMousePosition);
    });
  });

  describe('constructor', () => {
    it('can be constructed with options', () => {
      const instance = new MousePosition({ projection: 'XXX', coordinateFormat: () => '', className: 'XXX', placeholder: '<nothing>' });
      expect(instance).toBeInstanceOf(OlMousePosition);
    });
  });
});
