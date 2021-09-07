import {BottomRight, CompositeControl, Container} from "../../../../../../src";
import {ScaleLine} from "ol/control";

describe('bgis.ol.control.container.BottomRight', () => {

  describe('constructor', () => {
    test('can be constructed with bottom right options', () => {
      const instance = new BottomRight({horizontalControls: [], verticalControls: []});
      expect(instance).toBeInstanceOf(Container);
      expect(instance).toBeInstanceOf(CompositeControl);
    });
  });

  test('can not dispatch toggle event if no vertical controls are set', () => {
    const instance1 = new BottomRight({horizontalControls: [], verticalControls: []});
    expect(instance1.getToggleButton()).toBeNull();

    const instance2 = new BottomRight({horizontalControls: []});
    expect(instance2.getToggleButton()).toBeNull();
  });

  test('can dispatch toggle event if vertical controls are set', () => {
    const instance = new BottomRight({horizontalControls: [], verticalControls: [new ScaleLine()]});
    expect(instance.getToggleButton()).toBeTruthy();
    const onSpy = jest.fn();
    instance.on("toggle", () => onSpy());
    instance.getToggleButton()?.getButton().click();
    expect(onSpy).toHaveBeenCalled();
  });

});
