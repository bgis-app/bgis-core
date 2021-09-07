import {CompositeControl, Container, Footer, TopRight,} from "../../../../../../src";
import {Attribution, ScaleLine} from "ol/control";

const CONTAINERCLASSES = [Footer, TopRight];

describe('bgis.ol.control.container.Container', () => {

  describe('constructor', () => {
   test.each(CONTAINERCLASSES)('%s can be constructed with container options', (clazz) => {
      const instance = new clazz([]);
      expect(instance).toBeInstanceOf(Container);
      expect(instance).toBeInstanceOf(CompositeControl);
    });
  });

  describe('getStyleClass', () => {
    test.each(CONTAINERCLASSES)('%s can return style class', (clazz) => {
      const instance = new clazz([]);
      expect(instance.getStyleClass()).toBeTruthy();
    });
  });

  describe('getChildControls', () => {
    test.each(CONTAINERCLASSES)('%s can return child controls', (clazz) => {
      const instance = new clazz([ new ScaleLine(), new Attribution() ]);
      expect(instance.getChildControls().length).toBe(2);
    });
  });

});
