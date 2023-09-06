import {getFixedZoomPngOfMap, getVarZoomPngOfMap} from '../../../../../src/bgis/ol/util/pngOfMap';
import 'jest-canvas-mock';
import {Map} from "ol";
import {Size} from "ol/size";
import {Extent} from "ol/extent";
import {setupStaticImageExample, tearDownStaticImageExample} from "../../../../helpers";

describe("Png of Map", () => {

  let map: Map | null;

  let originalSize: Size | undefined;
  let originalResolution: number | undefined;
  let originalExtent: Extent;

  beforeEach(() => {

    map = setupStaticImageExample();

    originalSize = map.getSize();
    originalResolution = map.getView().getResolution();
    originalExtent = map.getView().getProjection().getExtent();

  });

  afterEach(() => {
    tearDownStaticImageExample();
  });

  it("cannot get empty maps as base64 image/png", () => {

    const invalidMap = new Map({});

    expect.assertions(1);
    return getFixedZoomPngOfMap(invalidMap).catch((e: Error) => {
      expect(e.message).toMatch('Nothing');
    });

  });

  it("can get fixed zoomed map without further parameters", () => {

    const promise = getFixedZoomPngOfMap(map!).then(exportedPng => {
      expect(exportedPng).toBeTruthy();
      expect(exportedPng).toContain('data:image/png;base64,00');
      expect(map?.getSize()).toBe(originalSize);
      expect(map?.getView().getResolution()).toBe(originalResolution);
      expect(map?.getView().getProjection().getExtent()).toBe(originalExtent);
    });

    map?.render();

    return promise;

  });

  it("can get fixed zoomed map with width parameter", () => {

    const promise = getFixedZoomPngOfMap(map!, 300).then(exportedPng => {
      expect(exportedPng).toBeTruthy();
      expect(exportedPng).toContain('data:image/png;base64,00');
      expect(map?.getSize()).toBe(originalSize);
      expect(map?.getView().getResolution()).toBe(originalResolution);
      expect(map?.getView().getProjection().getExtent()).toBe(originalExtent);
    });

    map?.render();

    return promise;

  });

  it("can get fixed zoomed map with width and height parameter", () => {

    const promise = getFixedZoomPngOfMap(map!, 300, 300).then(exportedPng => {
      expect(exportedPng).toBeTruthy();
      expect(exportedPng).toContain('data:image/png;base64,00');
      expect(map?.getSize()).toBe(originalSize);
      expect(map?.getView().getResolution()).toBe(originalResolution);
      expect(map?.getView().getProjection().getExtent()).toBe(originalExtent);
    });

    map?.render();

    return promise;

  });

  it("can get variable zoomed map without further parameters", () => {

    const promise = getVarZoomPngOfMap(map!).then(exportedPng => {
      expect(exportedPng).toBeTruthy();
      expect(exportedPng).toContain('data:image/png;base64,00');
      expect(map?.getSize()).toBe(originalSize);
      expect(map?.getView().getResolution()).toBe(originalResolution);
      expect(map?.getView().getProjection().getExtent()).toBe(originalExtent);
    });

    map?.render();

    return promise;

  });

  it("can get variable zoomed map with width parameter", () => {

    const promise = getVarZoomPngOfMap(map!, 300).then(exportedPng => {
      expect(exportedPng).toBeTruthy();
      expect(exportedPng).toContain('data:image/png;base64,00');
      expect(map?.getSize()).toBe(originalSize);
      expect(map?.getView().getResolution()).toBe(originalResolution);
      expect(map?.getView().getProjection().getExtent()).toBe(originalExtent);
    });

    map?.render();

    return promise;

  });

  it("can get variable zoomed map with width and height parameter", () => {

    const promise = getVarZoomPngOfMap(map!, 300, 300).then(exportedPng => {
      expect(exportedPng).toBeTruthy();
      expect(exportedPng).toContain('data:image/png;base64,00');
      expect(map?.getSize()).toBe(originalSize);
      expect(map?.getView().getResolution()).toBe(originalResolution);
      expect(map?.getView().getProjection().getExtent()).toBe(originalExtent);
    });

    map?.render();

    return promise;

  });

});
