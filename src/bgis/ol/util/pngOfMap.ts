import Map from 'ol/Map';

/**
 *
 * @param map
 * @param width
 * @param height
 */
export const getVarZoomPngOfMap = (map: Map, width?: number, height?: number): Promise<string> => {
  return internalBase64EncodedPngOfMap(map, false, width, height);
}

/**
 *
 * @param map
 * @param width
 * @param height
 */
export const getFixedZoomPngOfMap = (map: Map, width?: number, height?: number): Promise<string> => {
  return internalBase64EncodedPngOfMap(map, true, width, height);
};


/**
 *
 * @param width
 * @param height#
 *
 * @ignore
 * @hidden
 * @internal
 */
const internalDocumentOlCanvasToBase64EncPng = (width: number, height: number): Promise<string> => {
  return new Promise<string>(resolve => {

    const mapCanvas: HTMLCanvasElement = document.createElement('canvas');
    mapCanvas.width = width;
    mapCanvas.height = height;
    const mapContext = mapCanvas.getContext('2d');

    if (mapContext != null) {
      const regexp = new RegExp(/^matrix\(([^(]*)\)$/);
      document.querySelectorAll<HTMLCanvasElement>('.ol-layer canvas').forEach((canvas: HTMLCanvasElement) => {
        if (canvas.width > 0) {
          const opacity = (canvas.parentNode as HTMLElement).style.opacity;
          mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
          const transform = canvas.style.transform;
          // // Get the transform parameters from the style's transform matrix
          const match = regexp.exec(transform);
          if (Array.isArray(match)) {
            const matrix = match[1].split(',').map(Number);
            // // Apply the transform to the export map context
            // CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix);
            mapContext.setTransform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
          }
          mapContext.drawImage(canvas, 0, 0);
        }
      });
    }

    resolve(mapCanvas.toDataURL('image/png'));
  });
}

/**
 *
 * @param map
 * @param keepExtent
 * @param width
 * @param height
 *
 * @ignore
 * @hidden
 * @internal
 */
const internalBase64EncodedPngOfMap = (map: Map, keepExtent: boolean, width?: number, height?: number): Promise<string> => {

  return new Promise((resolve, reject) => {

    if (map != null && map.getSize() && map.getView()) {

      width = width || map.getSize()![0];
      height = height || map.getSize()![1];

      const printWidth = width;
      const printHeight = height;

      const originalSize = map.getSize()!;
      const originalExtent = map.getView().calculateExtent();

      map.once('rendercomplete', () => {

        const base64EncPromise = internalDocumentOlCanvasToBase64EncPng(printWidth, printHeight);

        map.setSize(originalSize);
        map.getView().fit(originalExtent, {size: originalSize});

        resolve(base64EncPromise);

      });

      map.setSize([printWidth, printHeight]);

      if (!keepExtent) {
        // don't use variable originalExtent here
        map.getView().fit(map.getView().calculateExtent(originalSize), {size: [printWidth, printHeight]});
      }

    } else {
      reject(new Error('Nothing to export'));
    }

  });


}
