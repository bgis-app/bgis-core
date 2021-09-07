import {CompositeControl, Container} from "../../../../../../src";
import {Attribution, ScaleLine} from "ol/control";

describe('bgis.ol.control.container.Container', () => {

  describe('constructor', () => {
   it('can be constructed with container options', () => {
      const instance = new Container({ styleClass: 'styleClass', childControls: [] });
      expect(instance).toBeInstanceOf(Container);
      expect(instance).toBeInstanceOf(CompositeControl);
    });
  });

  describe('getStyleClass', () => {
    it('can return style class', () => {
      const instance = new Container({ styleClass: 'styleClass', childControls: [] });
      expect(instance.getStyleClass()).toBe('styleClass');
    });
  });

  describe('getChildControls', () => {
    it('can return child controls', () => {
      const instance = new Container({ styleClass: 'styleClass', childControls: [ new ScaleLine(), new Attribution() ] });
      expect(instance.getChildControls().length).toBe(2);
    });
  });

});
