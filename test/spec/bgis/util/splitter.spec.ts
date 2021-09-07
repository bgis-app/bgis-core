import {expect, test} from "@jest/globals";
import {resizable, resizeDetails} from "../../../../src/bgis/util/splitter";
import {FakeMouseEvent} from "../../../helpers";

describe('bgis.util.splitter', () => {

  test('resizable handles mouse events in vertical direction', () => {

    document.body.innerHTML =
      '<div class="outerClass" style="width:1000px;height:1000px;">' +
      '<div class="splitter1" style="height:200px;width:1000px"></div>' +
      '<div class="splitter2" style="height:800px;width:1000px"></div></div>';

    document.querySelector('.splitter2')!
      .getBoundingClientRect =
      jest.fn(() => ({
        width: 1000,
        height: 800,
        x: 500,
        y: 500,
        top: 0,
        left: 0,
        bottom: 1000,
        right: 1000,
        toJSON: () => {
        }
      }));

    resizable(document.querySelector('.splitter1')!, 'vertical');

    (document.querySelector('.splitter1')! as HTMLDivElement).dispatchEvent(new FakeMouseEvent("mousedown", {
      clientX: 500,
      clientY: 200
    }));
    document.dispatchEvent(new FakeMouseEvent("mousemove", {clientX: 500, clientY: 200}));
    document.dispatchEvent(new FakeMouseEvent("mousemove", {clientX: 500, clientY: 700}));
    document.dispatchEvent(new FakeMouseEvent("mouseup", {clientX: 500, clientY: 700}));

    expect((document.querySelector('.outerClass')! as HTMLDivElement).style.height).toBe('1000px');
    expect((document.querySelector('.outerClass')! as HTMLDivElement).style.width).toBe('1000px');
    expect((document.querySelector('.splitter1')! as HTMLDivElement).style.height).toBe('200px');
    expect((document.querySelector('.splitter1')! as HTMLDivElement).style.width).toBe('1000px');
    expect((document.querySelector('.splitter2')! as HTMLDivElement).style.height).toBe('300px');
    expect((document.querySelector('.splitter2')! as HTMLDivElement).style.width).toBe('1000px');
  });

  test('resizable handles mouse events in horizontal direction', () => {

    document.body.innerHTML =
      '<div class="outerClass" style="width:1000px;height:1000px;">' +
      '<div class="splitter1" style="height:1000px;width:200px"></div>' +
      '<div class="splitter2" style="height:1000px;width:800px"></div></div>';

    document.querySelector('.splitter2')!
      .getBoundingClientRect =
      jest.fn(() => ({
        width: 800,
        height: 1000,
        x: 500,
        y: 500,
        top: 0,
        left: 0,
        bottom: 1000,
        right: 1000,
        toJSON: () => {
        }
      }));

    resizable(document.querySelector('.splitter1')!, 'horizontal');

    (document.querySelector('.splitter1')! as HTMLDivElement).dispatchEvent(new FakeMouseEvent("mousedown", {
      clientX: 200,
      clientY: 200
    }));
    document.dispatchEvent(new FakeMouseEvent("mousemove", {clientX: 200, clientY: 200}));
    document.dispatchEvent(new FakeMouseEvent("mousemove", {clientX: 700, clientY: 200}));
    document.dispatchEvent(new FakeMouseEvent("mouseup", {clientX: 700, clientY: 200}));

    expect((document.querySelector('.outerClass')! as HTMLDivElement).style.height).toBe('1000px');
    expect((document.querySelector('.outerClass')! as HTMLDivElement).style.width).toBe('1000px');
    expect((document.querySelector('.splitter1')! as HTMLDivElement).style.height).toBe('1000px');
    expect((document.querySelector('.splitter1')! as HTMLDivElement).style.width).toBe('200px');
    expect((document.querySelector('.splitter2')! as HTMLDivElement).style.height).toBe('1000px');
    expect((document.querySelector('.splitter2')! as HTMLDivElement).style.width).toBe('300px');
  });


  test('resizeDetails handles mouse events', () => {

    document.body.innerHTML =
      '<div class="outerClass" style="width:1000px;height:1000px;">' +
      '<div class="splitter1" style="height:200px;width:1000px"></div>' +
      '<div class="splitter2" style="height:800px;width:1000px"></div></div>';

    document.querySelector('.splitter2')!
      .getBoundingClientRect =
      jest.fn(() => ({
        width: 1000,
        height: 800,
        x: 500,
        y: 500,
        top: 0,
        left: 0,
        bottom: 1000,
        right: 1000,
        toJSON: () => {
        }
      }));

    resizeDetails(document.querySelector('.splitter1')!);

    (document.querySelector('.splitter1')! as HTMLDivElement).dispatchEvent(new FakeMouseEvent("mousedown", {
      clientX: 500,
      clientY: 200
    }));
    document.dispatchEvent(new FakeMouseEvent("mousemove", {clientX: 500, clientY: 200}));
    document.dispatchEvent(new FakeMouseEvent("mousemove", {clientX: 500, clientY: 700}));
    document.dispatchEvent(new FakeMouseEvent("mouseup", {clientX: 500, clientY: 700}));

    expect((document.querySelector('.outerClass')! as HTMLDivElement).style.height).toBe('-500px');
    expect((document.querySelector('.outerClass')! as HTMLDivElement).style.width).toBe('1000px');
    expect((document.querySelector('.splitter1')! as HTMLDivElement).style.height).toBe('200px');
    expect((document.querySelector('.splitter1')! as HTMLDivElement).style.width).toBe('1000px');
    expect((document.querySelector('.splitter2')! as HTMLDivElement).style.height).toBe('800px');
    expect((document.querySelector('.splitter2')! as HTMLDivElement).style.width).toBe('1000px');
  });

});
