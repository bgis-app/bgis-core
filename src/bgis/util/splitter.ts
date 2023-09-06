/**
 *
 * @param resizer
 * @param direction
 */
export function resizable(resizer: Element, direction: string): void {
    const nextSibling = resizer.nextElementSibling;

    if (nextSibling instanceof HTMLElement && resizer instanceof HTMLElement) {

        // The current position of the pointer
        let x = 0;
        let y = 0;

        let nextSiblingHeight = 0;
        let nextSiblingWidth = 0;

        // Handle the pointerdown event
        // that's triggered when user drags the resizer
        const pointerDownHandler = (e: PointerEvent) => {
            // Get the current pointer position
            x = e.clientX;
            y = e.clientY;
            const rectNext = nextSibling.getBoundingClientRect();
            nextSiblingHeight = rectNext.height;
            nextSiblingWidth = rectNext.width;

            /* Set the width of the nextSibling to its actual size */
            nextSibling.style.flex = `0 1 auto`;
            switch (direction) {
                case 'vertical':
                    nextSibling.style.height = `${nextSiblingHeight}px`;
                    break;
                case 'horizontal':
                default:
                    nextSibling.style.width = `${nextSiblingWidth}px`;
                    break;
            }
            // Attach the listeners to `document`
            document.addEventListener('pointermove', pointerMoveHandler);
            document.addEventListener('pointerup', pointerUpHandler);
            document.addEventListener('pointerleave', pointerUpHandler);
        };

        const pointerMoveHandler = (e: PointerEvent) => {
            // How far the pointer has been moved
            const dx = e.clientX - x;
            const dy = e.clientY - y;

            switch (direction) {
                case 'vertical':
                    nextSibling.style.height = `${nextSiblingHeight - dy}px`;
                    break;
                case 'horizontal':
                default:
                    nextSibling.style.width = `${nextSiblingWidth - dx}px`;
                    break;
            }
            window.dispatchEvent(new Event('resize'));
        };

        const pointerUpHandler = () => {
            document.removeEventListener('pointermove', pointerMoveHandler);
            document.removeEventListener('pointerup', pointerUpHandler);
        };

        // Attach the handler
        resizer.addEventListener('pointerdown', pointerDownHandler);
    } else {
        console.log("unable to add resizer");
    }
}

/**
 * Add click and movement handlers to the details splitter element.
 *
 * @param resizerElm
 */
export function resizeDetails(resizerElm?: Element): void {

    const resizer = resizerElm ?? document.querySelector(".bgis-details-splitter");

    if(resizer) {

      const parent = resizer.parentElement;
      const sidebar = parent?.parentElement;

      if (parent instanceof HTMLElement && resizer instanceof HTMLElement) {

        // The current position of pointer
        let y = 0;

        let parentHeight = 0;

        // Handle the pointerdown event
        // that's triggered when user drags the resizer
        const pointerDownHandler = (e: PointerEvent) => {

          // Get the current pointer position
          y = e.clientY;
          const rectNext = parent.getBoundingClientRect();
          parentHeight = rectNext.height;
          /* Set the height of the parent to its actual size */
          parent.style.flex = `0 1 auto`;
          parent.style.height = `${parentHeight}px`;

          // Attach the listeners to `document`
          document.addEventListener('pointermove', pointerMoveHandler);
          document.addEventListener('pointerup', pointerUpHandler);
          document.addEventListener('pointerleave', pointerUpHandler);
        };

        const pointerMoveHandler = (e: PointerEvent) => {

          // How far the pointer has been moved
          const dy = e.clientY - y;
          parent.style.height = `${parentHeight - dy}px`;

          if (sidebar) {
            if (parentHeight - dy > parent.offsetHeight) {
              sidebar.classList.add('max');
            } else {
              sidebar.classList.remove('max');
            }
          }

          window.dispatchEvent(new Event('resize'));
        };

        const pointerUpHandler = () => {

          document.removeEventListener('pointermove', pointerMoveHandler);
          document.removeEventListener('pointermove', pointerMoveHandler);
          document.removeEventListener('pointerup', pointerUpHandler);
        };

        // attach the handler
        resizer.addEventListener('pointerdown', pointerDownHandler);

      } else {
        console.log("unable to add resizeDetails");
      }

    }

}

/**
 * Attach a mutation observer to reset the height and flex setting if the details are removed.
 * Otherwise, these settings would squeeze sidebar elements in their height.
 * @param resizerElm
 */
export function registerResizeDetailsResetter(resizerElm?: Element) {
  let detailsVisible = false;
  const observer = new MutationObserver(() => {
    if(!document.querySelector('.show-map-details') || document.querySelector('.show-search-details')) {
      detailsVisible = true;
    }
    if(document.querySelector('.show-map-details')==null && document.querySelector('.show-search-details')==null && detailsVisible) {
      detailsVisible = false;
      resetDetails(resizerElm);
    }
  });
  const bgisMapArea = document.querySelector('.bgis-map-area');
  if(bgisMapArea) {
    observer.observe(bgisMapArea, { attributes: true });
  }
}

/**
 * Unset the dynamic styles set by the resizeDetails method.
 * Call this method when you close the details.
 *
 * @param resizerElm
 */
export function resetDetails(resizerElm?: Element): void {

  const resizer = resizerElm ?? document.querySelector(".bgis-details-splitter");

  if(resizer?.parentElement) {
    resizer.parentElement.style.removeProperty('flex');
    resizer.parentElement.style.removeProperty('height');
  }

}


/**
*
* @param resizer
*/
export function resizeListView(resizer: Element): void {

     const nextSibling = resizer.nextElementSibling;
    const previousSibling = resizer.previousElementSibling;

    if (previousSibling instanceof HTMLElement && nextSibling instanceof HTMLElement && resizer instanceof HTMLElement) {

        let parentWidth : number | undefined = undefined;
        let halfResizerWidth = 0; resizer.getBoundingClientRect().width / 2;


        // Handle the pointerdown event
        // that's triggered when user drags the resizer
        const pointerDownHandler = (e: PointerEvent) => {
            parentWidth = resizer.parentElement?.getBoundingClientRect().width;
            halfResizerWidth =  resizer.getBoundingClientRect().width / 2;

            previousSibling.style.flex = `0 1 auto`;

            // Attach the listeners to `document`
            document.addEventListener('pointermove', pointerMoveHandler);
            document.addEventListener('pointerup', pointerUpHandler);
            document.addEventListener('pointerleave', pointerUpHandler);
            previousSibling.style.width = `${e.clientX - halfResizerWidth}px`;
            nextSibling.style.width = `${(parentWidth ? parentWidth : 0)  - (e.clientX + halfResizerWidth)}px`

        };

        const pointerMoveHandler = (e: PointerEvent) => {

            previousSibling.style.width = `${e.clientX - halfResizerWidth}px`;
            nextSibling.style.width = `${(parentWidth ? parentWidth : 0)  - (e.clientX + halfResizerWidth)}px`
            window.dispatchEvent(new Event('resize'));
        };

        const pointerUpHandler = () => {
            previousSibling.style.flex = `1 1 auto`;

            document.removeEventListener('pointermove', pointerMoveHandler);
            document.removeEventListener('pointerup', pointerUpHandler);
        };

        // Attach the handler
        resizer.addEventListener('pointerdown', pointerDownHandler);
    } else {
        console.log("unable to add resizer");
    }
}


