import {Overview} from "../../../../../src";
import {expect} from "@jest/globals";
import {setupStaticImageExample, tearDownStaticImageExample} from "../../../../helpers";
import {MapEvent} from "ol";

describe('bgis.ol.control.Overview', () => {
  describe('constructor', () => {
    it('can be constructed without arguments', () => {
      const instance = new Overview();
      expect(instance).toBeInstanceOf(Overview);
    });
  });

  it('fires click event if button is clicked', () => {
    const instance = new Overview();
    const onSpy = jest.fn();
    instance.on('click', () => onSpy());
    instance.getOverviewContainerElement().click();
    expect(onSpy).toHaveBeenCalled();
    onSpy.mockRestore();
  });

  it('fires click event if button is clicked (even with preventDefault=true)', () => {
    const instance = new Overview({preventDefault: true});
    const onSpy = jest.fn();
    instance.on('click', () => onSpy());
    instance.getOverviewContainerElement().click();
    expect(onSpy).toHaveBeenCalled();
    onSpy.mockRestore();
  });

  it('does call use default click handler with preventDefault=false', () => {
    // @ts-ignore
    const MockedOverview = Overview as jest.Mock<Overview>;
    const onHandlerSpy = jest.spyOn(MockedOverview.prototype, 'onOverviewImageClick');
    const instance = new Overview({preventDefault: false});
    instance.getOverviewContainerElement().click();
    expect(onHandlerSpy).toHaveBeenCalled();
    onHandlerSpy.mockRestore();
  });

  it('does call use default click handler with preventDefault=true', () => {
    // @ts-ignore
    const MockedOverview = Overview as jest.Mock<Overview>;
    const onHandlerSpy = jest.spyOn(MockedOverview.prototype, 'onOverviewImageClick');
    const instance = new Overview({preventDefault: true});
    instance.getOverviewContainerElement().click();
    expect(onHandlerSpy).toHaveBeenCalledTimes(0);
    onHandlerSpy.mockRestore();
  });

  it('get correct crosshair svg element', () => {
    expect(Overview.getCrosshair(1, 2, 3, 4, 'test-class').outerHTML).toEqual("<line x1=\"1\" y1=\"2\" x2=\"3\" y2=\"4\" style=\"fill: none; stroke: black; stroke-width: 1px;\" class=\"bgis-overviewmap-svg-crosshair test-class\"></line>");
  });

  it('can calculate a correct resolution', () => {
    expect(Overview.calculateResolutionFromWidth(10, 20, 300)).toBe(0.03333333333333333);
  });

  it('can handle the ol map moveend event', () => {
    // @ts-ignore
    const onHandlerSpy = jest.spyOn(Overview.prototype, 'updateCrosshair');
    const map = setupStaticImageExample([new Overview()]);
    map.dispatchEvent(new MapEvent('moveend', map));
    expect(onHandlerSpy).toHaveBeenCalled();
    tearDownStaticImageExample();
  });

});
