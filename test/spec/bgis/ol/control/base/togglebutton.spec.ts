import {CompositeControl, Container, ToggleButton} from "../../../../../../src";
import {expect} from "@jest/globals";
import Map from "ol/Map";

describe('bgis.ol.control.base.ToggleButon', () => {

  describe('constructor', () => {
    it('can be constructed without options', () => {

      const containerToToggle = new Container({ styleClass: 'container', childControls: []});
      const instance = new ToggleButton({
        containerToToggle,
      });
      expect(instance).toBeInstanceOf(ToggleButton);
      expect(instance).toBeInstanceOf(CompositeControl);
    });
  });

  it('%s fires click event if button is clicked', () => {
    const containerToToggle = new Container({ styleClass: 'container', childControls: []});
    const instance = new ToggleButton({
      containerToToggle,
    });
    const onSpy = jest.fn();
    instance.on('click', () => onSpy());
    instance.getButton().click();
    expect(onSpy).toHaveBeenCalled();
    onSpy.mockRestore();
  });

  it('%s can switch toggle state', () => {
    const containerToToggle = new Container({ styleClass: 'container', childControls: []});
    const instance = new ToggleButton({
      containerToToggle,
    });
    expect(instance.isToggled).toBe(false);
    instance.getButton().click();
    expect(instance.isToggled).toBe(true);
    instance.getButton().click();
    expect(instance.isToggled).toBe(false);
  });

  it('%s can toggle icon unicode', () => {
    const unic = 0xe907;
    const unicToggled = 0xe908;

    const containerToToggle = new Container({ styleClass: 'container', childControls: []});
    const instance = new ToggleButton({
      containerToToggle,
      unicode: unic,
      unicodeToggled: unicToggled
    });
    expect(instance.getButton().textContent).toBe(String.fromCodePoint(unic));
    instance.getButton().click();
    expect(instance.getButton().textContent).toBe(String.fromCodePoint(unicToggled));
    instance.getButton().click();
    expect(instance.getButton().textContent).toBe(String.fromCodePoint(unic));
  });

  it('%s can toggle icon css class', () => {
    const iClass = 'cl1';
    const iClassToggled = 'cl2Toggled';

    const containerToToggle = new Container({ styleClass: 'container', childControls: []});
    const instance = new ToggleButton({
      containerToToggle,
      iconClassName: iClass,
      iconClassNameToggled: iClassToggled
    });
    expect(instance.getButton().innerHTML).toBe("<i class=\"bgis-icon cl1\"></i>");
    instance.getButton().click();
    expect(instance.getButton().innerHTML).toBe("<i class=\"bgis-icon cl2Toggled\"></i>");
    instance.getButton().click();
    expect(instance.getButton().innerHTML).toBe("<i class=\"bgis-icon cl1\"></i>");
  });

  it('%s can toggle overlayable', () => {

    const containerToToggle = new Container({ styleClass: 'container', childControls: []});
    const toggleButtonInstance = new ToggleButton({
      containerToToggle
    });

    const target = document.createElement('div');
    target.className = 'bgis';
    document.body.appendChild(target);

    const toggableOverlay = document.createElement('div');
    toggableOverlay.className = 'bgis-toggled-overlayable';
    target.appendChild(toggableOverlay);

    new Map({
      target: target,
      controls: [toggleButtonInstance],
    });

    expect(toggableOverlay.className).toBe('bgis-toggled-overlayable');
    toggleButtonInstance.getButton().click();
    expect(toggableOverlay.className).toBe('bgis-toggled-overlayable bgis-overlay-toggled-true');
    toggleButtonInstance.getButton().click();
    expect(toggableOverlay.className).toBe('bgis-toggled-overlayable');

  });

});
