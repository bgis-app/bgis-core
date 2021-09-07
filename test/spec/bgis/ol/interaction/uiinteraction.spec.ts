import {UiInteraction} from "../../../../../src";
import {setupStaticImageExample, tearDownStaticImageExample} from "../../../../helpers";

describe('bgis.ol.interaction.UiInteraction', () => {
  describe('constructor', () => {
    it('can be constructed without arguments', () => {
      const instance = new UiInteraction();
      expect(instance).toBeInstanceOf(UiInteraction);
    });
  });

  describe('constructor', () => {
    it('can be constructed with options', () => {
      const instance = new UiInteraction({ handleEvent: () => false });
      expect(instance).toBeInstanceOf(UiInteraction);
    });
  });

  describe('setMap', () => {
    it('can add event handler', () => {
      const instance = new UiInteraction({ handleEvent: () => false });

      const listviewSplitter = document.createElement('div');
      listviewSplitter.className = 'bgis-listview-splitter';
      document.body.appendChild(listviewSplitter);

      const detailSplitter = document.createElement('div');
      detailSplitter.className = 'bgis-detail-splitter';
      document.body.appendChild(detailSplitter);

      const map = setupStaticImageExample();

      map.addInteraction(instance);

      expect(instance).toBeInstanceOf(UiInteraction);


      tearDownStaticImageExample();
    });
  });
});
