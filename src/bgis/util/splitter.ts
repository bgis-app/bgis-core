/**
 *
 * @param resizer
 * @param direction
 */
export function resizable (resizer: Element, direction: string): void {
    const nextSibling = resizer.nextElementSibling;

    if (nextSibling instanceof HTMLElement && resizer instanceof HTMLElement) {

        // The current position of mouse
        let x = 0;
        let y = 0;

        let nextSiblingHeight = 0;
        let nextSiblingWidth = 0;

        // Handle the mousedown event
        // that's triggered when user drags the resizer
        const mouseDownHandler = (e: MouseEvent) => {
            // Get the current mouse position
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
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
            document.addEventListener('mouseleave', mouseUpHandler);
        };

        const mouseMoveHandler = (e: MouseEvent) => {
            // How far the mouse has been moved
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

        const mouseUpHandler = () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };

        // Attach the handler
        resizer.addEventListener('mousedown', mouseDownHandler);
    } else {
        console.log("unable to add resizer");
    }
}

/**
 *
 * @param resizer
 */
export function resizeDetails (resizer: Element): void {
    const parent = resizer.parentElement;
    const sidebar = parent?.parentElement;

    if (parent instanceof HTMLElement && resizer instanceof HTMLElement) {

        // The current position of mouse
        let y = 0;

        let parentHeight = 0;

        // Handle the mousedown event
        // that's triggered when user drags the resizer
        const mouseDownHandler = (e: MouseEvent) => {
            // Get the current mouse position
            y = e.clientY;
            const rectNext = parent.getBoundingClientRect();
            parentHeight = rectNext.height;
            /* Set the width of the nextSibling to ist actuals size */
            parent.style.flex = `0 1 auto`;
            parent.style.height = `${parentHeight}px`;

            // Attach the listeners to `document`
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
            document.addEventListener('mouseleave', mouseUpHandler);
        };

        const mouseMoveHandler = (e: MouseEvent) => {
            // How far the mouse has been moved
            const dy = e.clientY - y;
            parent.style.height = `${parentHeight - dy}px`;

            if (sidebar) {
                if(parentHeight - dy > parent.offsetHeight) {
                    sidebar.classList.add('max');
                } else {
                    sidebar.classList.remove('max');
                }
            }

            window.dispatchEvent(new Event('resize'));
        };

        const mouseUpHandler = () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };

        // Attach the handler
        resizer.addEventListener('mousedown', mouseDownHandler);
    } else {
        console.log("unable to add resizeDetails");
    }
}

