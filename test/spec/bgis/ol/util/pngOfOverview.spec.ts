import 'jest-canvas-mock';
import {getPngOfOverview} from "../../../../../src/bgis/ol/util/pngOfOverview";
import {Overview} from "../../../../../src";
import {Map} from "ol";
import {setupStaticImageExample, tearDownStaticImageExample} from "../../../../helpers";

describe("Png of Overview", () => {

  let map: Map;
  let overview: Overview;

  beforeEach(() => {

    overview = new Overview();

    map = setupStaticImageExample([overview]);

  });

  afterEach(() => {
    tearDownStaticImageExample();
  });

  it("cannot get not existing overview map", () => {

    map.removeControl(overview);

    expect.assertions(1);
    return getPngOfOverview(map).catch((e: Error) => {
      expect(e.message).toMatch('Nothing');
    });

  });

  it('can get a overview png without parameters', () => {

    return getPngOfOverview(map).then(exportedPng => {
      expect(exportedPng).toBeTruthy();
      expect(exportedPng).toContain('data:image/png;base64,00');
    });

  });

  it('can get a overview png with width parameter', () => {

    return getPngOfOverview(map, '100px').then(exportedPng => {
      expect(exportedPng).toBeTruthy();
      expect(exportedPng).toContain('data:image/png;base64,00');
    });

  });

  it('can get a overview png with width and background flag parameter', () => {

    return getPngOfOverview(map, '200px', false).then(exportedPng => {
      expect(exportedPng).toBeTruthy();
      expect(exportedPng).toContain('data:image/png;base64,00');
    });

  });

});
