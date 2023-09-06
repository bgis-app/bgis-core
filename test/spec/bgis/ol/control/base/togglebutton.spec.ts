import {CompositeControl, Container, ToggleButton} from "../../../../../../src";
import {expect} from "@jest/globals";

describe('bgis.ol.control.base.ToggleButton', () => {

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
    const unicode = 0xe907;
    const unicodeToggled = 0xe908;

    const containerToToggle = new Container({ styleClass: 'container', childControls: []});
    const instance = new ToggleButton({
      containerToToggle,
      unicode,
      unicodeToggled
    });
    expect(instance.getButton().textContent).toBe(String.fromCodePoint(unicode));
    instance.getButton().click();
    expect(instance.getButton().textContent).toBe(String.fromCodePoint(unicodeToggled));
    instance.getButton().click();
    expect(instance.getButton().textContent).toBe(String.fromCodePoint(unicode));
  });

  it('%s can toggle icon css class', () => {
    const iconClassName = 'cl1';
    const iconClassNameToggled = 'cl2Toggled';

    const containerToToggle = new Container({ styleClass: 'container', childControls: []});
    const instance = new ToggleButton({
      containerToToggle,
      iconClassName,
      iconClassNameToggled
    });
    expect(instance.getButton().innerHTML).toBe("<i class=\"bgis-icon cl1\"></i>");
    instance.getButton().click();
    expect(instance.getButton().innerHTML).toBe("<i class=\"bgis-icon cl2Toggled\"></i>");
    instance.getButton().click();
    expect(instance.getButton().innerHTML).toBe("<i class=\"bgis-icon cl1\"></i>");
  });

});
