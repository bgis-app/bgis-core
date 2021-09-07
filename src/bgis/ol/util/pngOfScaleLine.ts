import {dataUrlForSvgString, dataUrlToImage} from "../../util/base64";
import {CompositeControl, ScaleLine} from "../control";
import {PluggableMap} from "ol";
import {Control} from "ol/control";

/**
 *
 * @param map
 * @param minWidth
 * @param scaleFactor
 * @param withBackground
 */
export const getPngOfScaleLine = (map: PluggableMap, minWidth?: number, scaleFactor = 1, withBackground = true): Promise<string> => {

  return new Promise((resolve, reject) => {
    let scaleLineControlFound = false;
    const control = getScaleLineControl(map.getControls().getArray());
    if (control instanceof ScaleLine) {

      scaleLineControlFound = true;

      const originalMinWidth = control.getMinWidth();
      minWidth = (minWidth || originalMinWidth) / scaleFactor;

      control.setMinWidth(minWidth);

      map.once('rendercomplete', () => {

        resolve(getSVGDataUrl(scaleFactor, withBackground));

        control.setMinWidth(originalMinWidth);

        map.renderSync();

      });

      map.renderSync();

    }

    if (!scaleLineControlFound) {
      reject(new Error('Nothing to export'));
    }
  });

}

/**
 *
 * @param scaleFactor
 * @param withBackground
 */
const getSVGDataUrl = (scaleFactor = 1, withBackground = true): Promise<string> => {
  const scalelineSVG = document.getElementById('bgis-scaleline-svg');
  if (scalelineSVG) {

    let backgroundRect: HTMLElement | null = null;
    let oldFill: string | null = null;
    const oldWidth = scalelineSVG.getAttribute('width');

    if (oldWidth) {
      scalelineSVG.setAttribute('width', String(+oldWidth * scaleFactor));
    }

    if (!withBackground) {
      backgroundRect = document.getElementById('bgis-scaleline-svg-background');
      if (backgroundRect) {
        oldFill = backgroundRect.getAttribute('fill');
        backgroundRect.setAttribute('fill', 'transparent');
      }
    }

    const svgStr = new XMLSerializer().serializeToString(scalelineSVG);

    if (oldWidth) {
      scalelineSVG.setAttribute('width', oldWidth);
    }

    if (!withBackground && backgroundRect && oldFill) {
      backgroundRect.setAttribute('fill', oldFill);
    }

    return dataUrlToImage(dataUrlForSvgString(svgStr));
  }
  return Promise.reject();
}

/**
 *
 * @param controls
 */
const getScaleLineControl = (controls: Control[]): ScaleLine | null => {
  for (let i = 0; i < controls.length; i++) {
    const control = controls[i];
    if (control instanceof ScaleLine) {
      return control;
    }
    if (control instanceof CompositeControl) {
      const scalelineControl = getScaleLineControl(control.getChildControls());
      if (scalelineControl != null) {
        return scalelineControl;
      }
    }
  }
  return null;
}
