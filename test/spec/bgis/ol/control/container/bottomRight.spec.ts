import {BottomRight, CompositeControl, Container, GeoLocate, Print, Tools} from "../../../../../../src";
import {emulateWindowsResizeEvent, setupStaticImageExample} from "../../../../../helpers";
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

  test('can put horizontal controls to verticals on mobiles', () => {

    emulateWindowsResizeEvent(800);

    const instance = new BottomRight({horizontalControls: [new GeoLocate(), new Tools()], verticalControls: [new ScaleLine(), new Print()]});

    setupStaticImageExample([instance]);

    expect(document.documentElement.clientWidth).toBe(800);
    expect( instance.getToggleButton()?.getContainerToToggle().getChildControls().length).toBe(2);

    emulateWindowsResizeEvent(150);

    expect(document.documentElement.clientWidth).toBe(150);
    expect( instance.getToggleButton()?.getContainerToToggle().getChildControls().length).toBe(4);

    emulateWindowsResizeEvent(800);

    expect(document.documentElement.clientWidth).toBe(800);
    expect( instance.getToggleButton()?.getContainerToToggle().getChildControls().length).toBe(2);

  });

  test('can put horizontal controls to non existing verticals on mobiles', () => {

    emulateWindowsResizeEvent(800);

    const instance = new BottomRight({horizontalControls: [new GeoLocate(), new Tools()]});

    setupStaticImageExample([instance]);

    expect(document.documentElement.clientWidth).toBe(800);
    expect( instance.getToggleButton()).toBeNull();

    emulateWindowsResizeEvent(150);

    expect(document.documentElement.clientWidth).toBe(150);
    expect( instance.getToggleButton()?.getContainerToToggle().getChildControls().length).toBe(2);

    emulateWindowsResizeEvent(800);

    expect(document.documentElement.clientWidth).toBe(800);
    expect( instance.getToggleButton()).toBeNull();

    emulateWindowsResizeEvent(150);

    expect(document.documentElement.clientWidth).toBe(150);
    expect( instance.getToggleButton()?.getContainerToToggle().getChildControls().length).toBe(2);

    emulateWindowsResizeEvent(800);

    expect(document.documentElement.clientWidth).toBe(800);
    expect( instance.getToggleButton()).toBeNull();

  });

  test('does not move one horizontal control to verticals on mobiles if there are no verticals', () => {

    emulateWindowsResizeEvent(800);

    const instance = new BottomRight({horizontalControls: [new Print()]});

    setupStaticImageExample([instance]);

    expect(document.documentElement.clientWidth).toBe(800);
    expect(instance.getToggleButton()).toBeNull();

    emulateWindowsResizeEvent(150);

    expect(document.documentElement.clientWidth).toBe(150);
    expect( instance.getToggleButton()).toBeNull();

    emulateWindowsResizeEvent(800);
    expect(document.documentElement.clientWidth).toBe(800);
    expect( instance.getToggleButton()).toBeNull();

  });



});
