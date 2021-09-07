import {CompositeControl} from "../../../../../../src";

describe('bgis.ol.control.base.CompositeControl', () => {

  class Clazz extends CompositeControl {
    constructor() {
      super([]);
    }
  }

  describe('constructor', () => {
    it('can be constructed without options', () => {
      const instance = new Clazz();
      expect(instance).toBeInstanceOf(Clazz);
      expect(instance).toBeInstanceOf(CompositeControl);
    });
  });

});
