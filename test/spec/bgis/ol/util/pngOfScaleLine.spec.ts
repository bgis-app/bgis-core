import 'jest-canvas-mock';
import {getPngOfScaleLine} from "../../../../../src/bgis/ol/util/pngOfScaleLine";
import {ScaleLine} from "../../../../../src";
import {Map, View} from "ol";
import {disableCoordinateWarning} from "ol/proj";

describe("Png of Scaleline", () => {

  let map: Map | null;
  let target: string | HTMLElement | null;
  let scaleline: ScaleLine;

  beforeEach(() => {

    scaleline = new ScaleLine();

    target = document.createElement('div');
    target.style.width = '100px';
    target.style.height = '100px';
    document.body.appendChild(target);

    // explicitly disable OpenLayer View warning with default projection (EPSG:3857) and small coordinates (<90/180)
    // (OpenLayer implicitly disables warning only with projection option set)
    disableCoordinateWarning();

    map = new Map({
      target: target,
      controls: [scaleline],
    });
    map.setSize([100, 100]);
    map.setView(new View({
      center: [50, 50],
      extent: [0, 0, 100, 100],
      resolution: 1,
      resolutions: [4, 2, 1, 0.5, 0.25, 0.125],
    }));
  });

  afterEach(() => {
    map?.dispose();
    document.body.removeChild<HTMLElement>(<HTMLElement>target);
    map = null;
    target = null;
  });

  it("cannot get not existing scaleline", () => {

    const invalidMap = new Map({});

    expect.assertions(1);
    return getPngOfScaleLine(invalidMap).catch((e: Error) => {
      expect(e.message).toMatch('Nothing');
    });

  });

  it('can get a scaleline png without further parameters', () => {

    const promise = getPngOfScaleLine(map!).then(exportedPng => {
      expect(exportedPng).toBeTruthy();
      expect(exportedPng).toContain('data:image/png;base64,00');
    });

    map?.render();

    return promise;

  });

  it('can get a scaleline png with min width parameters', () => {

    const promise = getPngOfScaleLine(map!, 200).then(exportedPng => {
      expect(exportedPng).toBeTruthy();
      expect(exportedPng).toContain('data:image/png;base64,00');
    });

    map?.render();

    return promise;

  });

  it('can get a scaleline png with min width and scale factor parameters', () => {

    const promise = getPngOfScaleLine(map!, 200, 2).then(exportedPng => {
      expect(exportedPng).toBeTruthy();
      expect(exportedPng).toContain('data:image/png;base64,00');
    });

    map?.render();

    return promise;

  });

  it('can get a scaleline png with min width, scale factor and background flag parameters', () => {

    const promise = getPngOfScaleLine(map!, 200, 2, false).then(exportedPng => {
      expect(exportedPng).toBeTruthy();
      expect(exportedPng).toContain('data:image/png;base64,00');
    });

    map?.render();

    return promise;

  });

});
