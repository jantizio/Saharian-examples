document.addEventListener('DOMContentLoaded', () => {
    const toolbars = document.querySelectorAll('[role="toolbar"], .toolbar');

    toolbars.forEach((toolbar) => {
        const controls = Array.from(toolbar.querySelectorAll('button:not([disabled])'));

        controls.forEach((control, index) => {
            if (index === 0)
                control.setAttribute('tabindex', '0');
            else
                control.setAttribute('tabindex', '-1');
        });

        const focusElement = (index) => {
            controls.forEach((control) => control.setAttribute('tabindex', '-1'));
            controls[index].setAttribute('tabindex', '0');
            controls[index].focus();
        };

        toolbar.addEventListener('keydown', (event) => {
            const key = event.key;
            const currentIndex = controls.indexOf(document.activeElement);
            console.log(event.key, currentIndex);

            if (key === 'ArrowRight') {
                event.preventDefault();
                focusElement((currentIndex + 1) % controls.length);
            } else if (key === 'ArrowLeft') {
                event.preventDefault();
                focusElement((currentIndex - 1 + controls.length) % controls.length);
            } else if (key === 'Home') {
                event.preventDefault();
                focusElement(0);
            } else if (key === 'End') {
                event.preventDefault();
                focusElement(controls.length - 1);
            }
        });
    });
});