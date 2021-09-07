import {dataUrlForSvgString, dataUrlToImage, downloadBase64EncFile} from "../../../../src/bgis/util/base64";

describe('bgis.util.base64', () => {

  const SVGSTR = '<svg height="2" width="2"><circle cx="1" cy="1" r="1" stroke="black" stroke-width="0" fill="black" /></svg>';

  test('dataUrlForSvgString can convert a svg string to a data url', () => {
    expect(dataUrlForSvgString(SVGSTR)).toBe( "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjIiIHdpZHRoPSIyIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIwIiBmaWxsPSJibGFjayIgLz48L3N2Zz4=");
  });

 test('dataUrlToImage can give a promise with png data url', () => {
   return dataUrlToImage(dataUrlForSvgString(SVGSTR)).then(exportedPng => {
     expect(exportedPng).toBe("data:,");
   });
 });

 test('downloadBase64EncFile can download a file', () => {
   document.body.innerHTML = '<div></div>';
   const onSpy = jest.fn();
   window.addEventListener('click', () => onSpy());
   downloadBase64EncFile(dataUrlForSvgString(SVGSTR), 'test.svg');
   expect(onSpy).toHaveBeenCalled();
 });

});
