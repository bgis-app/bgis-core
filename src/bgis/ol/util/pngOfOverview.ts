import {dataUrlForSvgString, dataUrlToImage} from "../../util/base64";
import {PluggableMap} from "ol";
import {CompositeControl, Overview} from "../control";
import {Control} from "ol/control";

/**
 *
 * @param map
 * @param width
 * @param withBackground
 */
export const getPngOfOverview = (map: PluggableMap, width?: string, withBackground = true): Promise<string> => {
  const control = getOverviewControl(map.getControls().getArray());
  if (control instanceof Overview) {

    const overviewSVG = control.getSVGElement();
    if (overviewSVG) {

      let backgroundRect: SVGRectElement | null = null;
      let oldFill: string | null = null;
      const oldWidth = overviewSVG.getAttribute('width');

      if (!withBackground) {
        backgroundRect = control.getBackgroundRectElement();
        if (backgroundRect) {
          oldFill = backgroundRect.getAttribute('fill');
          backgroundRect.setAttribute('fill', 'transparent');
        }
      }

      if (!width && overviewSVG.parentElement?.clientWidth) {
        width = overviewSVG.parentElement.clientWidth + 'px';
      }

      if (width) {
        overviewSVG.setAttribute('width', width);
      }

      const svgStr = new XMLSerializer().serializeToString(overviewSVG);

      if (!withBackground && backgroundRect && oldFill) {
        backgroundRect.setAttribute('fill', oldFill);
      }

      if (oldWidth) {
        overviewSVG.setAttribute('width', oldWidth);
      }

      return dataUrlToImage(dataUrlForSvgString(svgStr));
    }
  }
  return Promise.reject(new Error('Nothing to export'));
}

/**
 *
 * @param controls
 */
const getOverviewControl = (controls: Control[]): Overview | null => {
  for (let i = 0; i < controls.length; i++) {
    const control = controls[i];
    if (control instanceof Overview) {
      return control;
    }
    if (control instanceof CompositeControl) {
      const overviewControl = getOverviewControl(control.getChildControls());
      if (overviewControl != null) {
        return overviewControl;
      }
    }
  }
  return null;
}
