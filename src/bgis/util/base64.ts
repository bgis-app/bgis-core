/**
 *
 * Converts a svg xml string into a valid data URL
 * with "data:image/svg+xml;base64," prefix
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 * @param svg the
 *
 */
export const dataUrlForSvgString = (svg: string): string => {
  return 'data:image/svg+xml;base64,' + window.btoa(svg);
}

/**
 *
 * Converts a data URL to an image (default "image/png")
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 *
 * @param dataUrl a data url string
 * @param imageMimeType a image mime type - default: image/png
 *
 */
export const dataUrlToImage = (dataUrl: string, imageMimeType = 'image/png'): Promise<string> => {
  return new Promise((resolve) => {
    const svgImage = document.createElement('img');
    svgImage.style.position = 'absolute';
    svgImage.style.top = '-9999px';
    document.body.appendChild(svgImage);
    svgImage.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = svgImage.clientWidth;
      canvas.height = svgImage.clientHeight;
      const canvasCtx = canvas.getContext('2d');
      canvasCtx?.drawImage(svgImage, 0, 0);
      const imgData = canvas.toDataURL(imageMimeType);
      resolve(imgData);
      document.body.removeChild(svgImage);
    };
    svgImage.src = dataUrl;
  });

}

/**
 * A simple method to download a data url string as file in the browser
 *
 * @param contentBase64 the data url
 * @param fileName a file name
 *
 */
export const downloadBase64EncFile = (contentBase64: string, fileName: string): void => {
  const downloadLink = document.createElement('a');
  document.body.appendChild(downloadLink);

  downloadLink.href = contentBase64;
  downloadLink.target = '_self';
  downloadLink.download = fileName;
  downloadLink.click();
}
