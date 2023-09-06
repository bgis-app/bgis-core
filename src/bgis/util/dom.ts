/**
 * A simple helper method for simpler handling of arrays.
 * Regardless if you give a string or an array of strings you will receive an array
 *
 * @param value a string or an array of string
 */
const toArray = (value: string | string[]) => {
  if (Array.isArray(value)) {
    return value;
  } else {
    return [value];
  }
};

/**
 * Creates a child HTML element if it does not exist and adds it as child to the given element
 *
 * @param element the parent element
 * @param tagName the tag name for the new child - e.g. div
 * @param className a css class name for the new child
 */
export const createChildIfNotExist = (element: HTMLElement | null, tagName: string, className: string): void => {
    if (element != null) {
      if (!element.querySelector(`.${className}`)) {
        element.appendChild(createElement(tagName, className));
      }
    } else {
      console.log("Enclosing element is null");
    }
  }
;

/**
 * Removes a child element with given css class name of the given element
 * @param element the parent element
 * @param className the css class name of the child element
 */
export const removeChildIfExist = (element: HTMLElement | null, className: string): void => {
  if (element != null) {
    const child = element.querySelector(`.${className}`);
    if (child != null && element.contains(child)) {
      element.removeChild(child);
    }
  }
}

/**
 * Remove all children elements with given css class name of the given parent element.
 * The children don't have to be a direct child of the parent element.
 * @param element the parent element
 * @param className the css class name of the child element
 */
export const removeChildrenIfExist = (element: HTMLElement | null, className: string): void => {
  if (element != null) {
    const children = element.querySelectorAll(`.${className}`);
    if (children != null && children.length>0) {
      children.forEach(child => child.parentElement&&child.parentElement.removeChild(child));
    }
  }
}

/**
 * Creates a HTML element
 * @param tagName the tag name for the new element - e.g. div
 * @param className a css class name for the new element
 */
export const createElement = (tagName: string, className: string): HTMLElement => {
  const element = document.createElement(tagName);
  element.className = className;
  return element;
};

/**
 * Toggles css class names of elements found by the given selector(s)
 * @param selectors2toggle one or more css selectors
 * @param toggleClassNames one or more class names to toggle
 * @param ancestor an ancestor element for the query selection (default is document)
 */
export const toggleClass = (selectors2toggle: string | string[], toggleClassNames: string | string[], ancestor: Document | Element = document): void => {
  toArray(selectors2toggle).forEach(selector2toggle => {
    const toggleElement = ancestor.querySelector(selector2toggle);
    if (toggleElement) {
      toArray(toggleClassNames).forEach(
        toggleClassName => toggleElement?.classList.toggle(toggleClassName)
      );
    }
  });
}

/**
 * Adds a click event listener to elements which triggers css class toggling
 * @param clickSelectors one or more css selectors for the elements which shall listen to click events
 * @param selectors2toggle one or more css class selectors for the elements with the css classes to toggle
 * @param toggleClassNames one or more css class names which shall toggle
 */
export const toggleClassOnClick = (clickSelectors: string | string[], selectors2toggle: string | string[], toggleClassNames: string | string[]): void => {
  toArray(clickSelectors).forEach(clickSelector => {
    document.querySelector(clickSelector)?.addEventListener('click', (event) => {
      toggleClass(selectors2toggle, toggleClassNames);
      event.stopPropagation();
    });
  });
}


/**
 * Removes(s) class names.
 * @param selectors2remove The selector of the element where to remove from.
 * @param removeClassNames The class name(s) to remove.
 * @param ancestor The ancestor to use.
 */
export const removeClass = (selectors2remove: string | string[], removeClassNames: string | string[], ancestor: Document | Element = document): void => {
  toArray(selectors2remove).forEach(selector2toggle => {
    const toggleElement = ancestor.querySelector(selector2toggle);
    if (toggleElement) {
      toArray(removeClassNames).forEach(
        toggleClassName => toggleElement?.classList.remove(toggleClassName)
      );
    }
  });
}

/**
 * Adds class names(s).
 * @param selectors2add The selector of the element where to add to.
 * @param addClassNames The class names(s) to add.
 * @param ancestor The ancestor to use.
 */
export const addClass = (selectors2add: string | string[], addClassNames: string | string[], ancestor: Document | Element = document): void => {
  toArray(selectors2add).forEach(selector2toggle => {
    const toggleElement = ancestor.querySelector(selector2toggle);
    if (toggleElement) {
      toArray(addClassNames).forEach(
        toggleClassName => toggleElement?.classList.add(toggleClassName)
      );
    }
  });
}




