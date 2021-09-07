import {BasemapSource} from "../../../../../src";
import {expect} from "@jest/globals";
import {Source} from "ol/source";

describe('bgis.ol.source.BasemapSource', () => {

  describe('constructor', () => {
    it('can be constructed without arguments', () => {
      const instance = new BasemapSource();
      expect(instance).toBeInstanceOf(Source);
    });

    it('can be constructed with variant', () => {
      const instance = new BasemapSource({ variant: 'geolandbasemap' });
      expect(instance).toBeInstanceOf(Source);
    });
  });

});
