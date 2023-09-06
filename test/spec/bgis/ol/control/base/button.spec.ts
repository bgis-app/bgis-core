import {Button, GeoLocate, Layer, Print, Share, Tools, ViewList} from "../../../../../../src";
import EventType from "ol/events/EventType";
import BaseEvent from "ol/events/Event";

const BUTTON_CLASSES_WITH_CSS_ICON = [Share, Print, Layer, Tools, ViewList];
const BUTTON_CLASSES = [...BUTTON_CLASSES_WITH_CSS_ICON, GeoLocate];

describe('bgis.ol.control.base.Button', () => {

  const TESTUNICODE = 0xe903;

  describe('constructor', () => {
    test.each(BUTTON_CLASSES)('%s can be constructed without arguments', clazz => {
      const instance = new clazz();
      expect(instance).toBeInstanceOf(clazz);
      expect(instance).toBeInstanceOf(Button);
    });
  });

  test.each(BUTTON_CLASSES)('%s fires click event if button is clicked', clazz => {
    const instance = new clazz();
    const onSpy = jest.fn();
    instance.on('click', () => onSpy());
    instance.getButton().click();
    expect(onSpy).toHaveBeenCalled();
    onSpy.mockRestore();
  });

  test.each(BUTTON_CLASSES)('%s fires click event if button is clicked (even with preventDefault=true)', clazz => {
    const instance = new clazz({preventDefault: true});
    const onSpy = jest.fn();
    instance.on('click', () => onSpy());
    instance.getButton().click();
    expect(onSpy).toHaveBeenCalled();
    onSpy.mockRestore();
  });

  test.each(BUTTON_CLASSES)('%s does call default click handler with preventDefault=false', clazz => {
    const onSpy = jest.spyOn(clazz.prototype, 'handleEvent');
    const instance = new clazz({preventDefault: false});
    instance.getButton().click();
    expect(onSpy).toHaveBeenCalled();
    onSpy.mockRestore();
  });

  test.each(BUTTON_CLASSES)('%s does call default click handler and custom click handler with preventDefault=false', clazz => {
    const onSpy = jest.spyOn(clazz.prototype, 'handleEvent');
    const instance = new clazz({preventDefault: false});
    const onSpyCustom = jest.fn();
    instance.on('click', () => onSpyCustom());
    instance.getButton().click();
    expect(onSpy).toHaveBeenCalled();
    expect(onSpyCustom).toHaveBeenCalled();
    onSpy.mockRestore();
    onSpyCustom.mockRestore();
  });

  test.each(BUTTON_CLASSES)('%s does not call default click handler with preventDefault=true', clazz => {
    const onSpy = jest.spyOn(clazz.prototype, 'handleEvent');
    const instance = new clazz({preventDefault: true});
    instance.getButton().click();
    expect(onSpy).toHaveBeenCalledTimes(0);
    onSpy.mockRestore();
  });

  test.each(BUTTON_CLASSES)('%s can overwrite default options', clazz => {

    const TESTTOOLTIP = 'TESTTOOLTIP';
    const TESTUNICODE = 0xe903;

    const instance1 = new clazz();
    expect(instance1.getButton().title).not.toBe(TESTTOOLTIP);
    expect(instance1.getButton().textContent).not.toBe(String.fromCodePoint(TESTUNICODE));

    const instance2 = new clazz({tooltip: TESTTOOLTIP, unicode: TESTUNICODE});
    expect(instance2.getButton().title).toBe(TESTTOOLTIP);
    expect(instance2.getButton().textContent).toBe(String.fromCodePoint(TESTUNICODE));

  });

  test.each(BUTTON_CLASSES)('%s returns true with other events than click', clazz => {

    const instance = new clazz();
    expect(instance.handleEvent(new BaseEvent(EventType.DBLCLICK))).toBe(true);

  });

  test.each(BUTTON_CLASSES_WITH_CSS_ICON)('%s can change unicode text content (and reset icon tag)', clazz => {

    const instance = new clazz({ iconClassName: 'testiconclassname' });
    expect(instance.getButton().textContent).not.toBe(String.fromCodePoint(TESTUNICODE));
    expect(instance.getButton().innerHTML).toBe('<i class="bgis-icon testiconclassname"></i>');

    instance.setButtonUnicode(TESTUNICODE);

    expect(instance.getButton().innerHTML).toBe("<i class=\"bgis-icon\">" + String.fromCodePoint(TESTUNICODE) + "</i>");
    expect(instance.getButton().textContent).toBe(String.fromCodePoint(TESTUNICODE));

  });

  test.each(BUTTON_CLASSES)('%s can change icon class tag (and reset unicode)', clazz => {

    const instance = new clazz({ unicode: TESTUNICODE });
    expect(instance.getButton().textContent).toBe(String.fromCodePoint(TESTUNICODE));
    expect(instance.getButton().innerHTML).toBe("<i class=\"bgis-icon\">" + String.fromCodePoint(TESTUNICODE) + "</i>");

    instance.setButtonIconClassName('testiconclassname');

    expect(instance.getButton().innerHTML).toBe('<i class="bgis-icon testiconclassname"></i>');
    expect(instance.getButton().textContent).not.toBe(String.fromCodePoint(TESTUNICODE));

  });


});
