import {expect, test} from '@jest/globals'
import { nothing } from 'ol/pixel';
import {
  createChildIfNotExist,
  removeChildIfExist,
  removeChildrenIfExist,
  toggleClass,
  toggleClassOnClick,
  addClass,
  removeClass
} from "../../../../src/bgis/util/dom";

describe('bgis.util.dom', () => {

  beforeEach(() => {
    document.body.innerHTML =
      '<div class="testClass"><div class="childTestClass"></div></div>';
    document.body.innerHTML += '<div class="testParentClass"><div class="testSomething"><div class="testChildClass"></div></div><div class="testChildClass"></div></div>';

  });

  test('createChildIfNotExist does not create an element if it exists', () => {
    createChildIfNotExist(document.querySelector('.testClass'), 'div', 'childTestClass');
    expect(document.querySelectorAll('.childTestClass').length).toBe(1);
  });

  test('createChildIfNotExist can create an element', () => {
    createChildIfNotExist(document.querySelector('.testClass'), 'div', 'newChildClass');
    expect(document.querySelectorAll('.childTestClass').length).toBe(1);
    expect(document.querySelectorAll('.newChildClass').length).toBe(1);
  });

  test('removeChildIfExist removes a child element with given css class', () => {
    removeChildIfExist(document.querySelector('.testClass'), 'childTestClass');
    expect(document.querySelectorAll('.childTestClass').length).toBe(0);
  });

  test('removeChildIfExist does not remove something if child to remove does not exist', () => {
    expect(document.querySelectorAll('.childTestClass').length).toBe(1);
    removeChildIfExist(document.querySelector('.testClass'), 'XYZ');
    expect(document.querySelectorAll('.childTestClass').length).toBe(1);
  });

  test('removeChildIfExist removes all children with given css class', () => {
    removeChildrenIfExist(document.querySelector('.testParentClass'), 'testChildClass');
    expect(document.querySelectorAll('.testChildClass').length).toBe(0);
  });

  test('toggleClass does toggle a css class of one selector', () => {
    toggleClass('.testClass', 'black');
    expect(document.querySelector('.testClass')!.classList).toContain('black');
    toggleClass(['.testClass'], ['black']);
    expect(document.querySelector('.testClass')!.classList).not.toContain('black');
  });

  test('toggleClass does toggle two css classes of two selectors', () => {
    toggleClass(['.testClass', '.childTestClass'], ['black', 'black2']);
    expect(document.querySelector('.testClass')!.classList).toContain('black');
    expect(document.querySelector('.testClass')!.classList).toContain('black2');
    expect(document.querySelector('.childTestClass')!.classList).toContain('black');
    expect(document.querySelector('.childTestClass')!.classList).toContain('black2');
    toggleClass(['.testClass', '.childTestClass'], ['black', 'black2']);
    expect(document.querySelector('.testClass')!.classList).not.toContain('black');
    expect(document.querySelector('.testClass')!.classList).not.toContain('black2');
    expect(document.querySelector('.childTestClass')!.classList).not.toContain('black');
    expect(document.querySelector('.childTestClass')!.classList).not.toContain('black2');
  });

  test('toggleClassOnClick does toggle a css class of a selector on button click event', () => {
    document.body.innerHTML += '<button type="button" class="testButtonClass">test</button>';
    toggleClassOnClick('.testButtonClass', '.testClass', 'black');
    (document.querySelector('.testButtonClass') as HTMLButtonElement).click();
    expect(document.querySelector('.testClass')!.classList).toContain('black');
    (document.querySelector('.testButtonClass') as HTMLButtonElement).click();
    expect(document.querySelector('.testClass')!.classList).not.toContain('black');
  });


  test('addClass remove Class adds a css class', () => {
    document.body.innerHTML += '<div class="testAddClass"></div>';
    addClass('.testAddClass', 'added' );
      expect(document.querySelector('.testAddClass')!.classList).toContain('added');
      removeClass('.testAddClass', 'added' );
      expect(document.querySelector('.testAddClass')!.classList).not.toContain('added');
  });

});
