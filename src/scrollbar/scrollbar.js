const piContainers = document.querySelectorAll(".scroll-container");
const scrollbars = document.querySelectorAll('[role="scrollbar"], .wrong-scrollbar');
const thumbs = document.querySelectorAll("#thumb");

piContainers.forEach((piContainer, index) => {
    const scrollbar = scrollbars[index];
    const thumb = thumbs[index];

    const scrollbarWidth = scrollbar.offsetWidth;
    const contentWidth = piContainer.scrollWidth;
    const visibleWidth = piContainer.offsetWidth;
    const thumbWidth = Math.max((visibleWidth / contentWidth) * scrollbarWidth, 30);
    thumb.style.width = `${thumbWidth}px`;

    let dragging = false;
    let startX, startLeft;

    function updateScrollbar(position) {
        const maxScrollLeft = contentWidth - visibleWidth;
        const scrollRatio = position / (scrollbarWidth - thumbWidth);
        const scrollLeft = scrollRatio * maxScrollLeft;

        piContainer.scrollLeft = scrollLeft;
        scrollbar.setAttribute("aria-valuenow", Math.round((scrollLeft / maxScrollLeft) * 100));
    }

    thumb.addEventListener("mousedown", (e) => {
        dragging = true;
        startX = e.clientX;
        startLeft = parseInt(thumb.style.left, 10) || 0;
        document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", (e) => {
        if (!dragging) return;

        const deltaX = e.clientX - startX;
        let newLeft = startLeft + deltaX;

        newLeft = Math.max(0, Math.min(newLeft, scrollbarWidth - thumbWidth));
        thumb.style.left = `${newLeft}px`;

        updateScrollbar(newLeft);
    });

    document.addEventListener("mouseup", () => {
        dragging = false;
        document.body.style.userSelect = "";
    });

    piContainer.addEventListener("scroll", () => {
        const maxScrollLeft = contentWidth - visibleWidth;
        const scrollLeft = piContainer.scrollLeft;
        const thumbPosition = (scrollLeft / maxScrollLeft) * (scrollbarWidth - thumbWidth);

        thumb.style.left = `${thumbPosition}px`;
        scrollbar.setAttribute("aria-valuenow", Math.round((scrollLeft / maxScrollLeft) * 100));
    });

    // Add keyboard interaction
    piContainer.addEventListener("keydown", (e) => {
        const step = 10; // Small step for Arrow keys
        const pageStep = visibleWidth; // Step for PageUp/PageDown and Space keys
        const maxScrollLeft = contentWidth - visibleWidth;

        let scrollLeft = piContainer.scrollLeft;
        switch (e.key) {
            case "ArrowRight":
                scrollLeft = Math.min(scrollLeft + step, maxScrollLeft);
                break;
            case "ArrowLeft":
                scrollLeft = Math.max(scrollLeft - step, 0);
                break;
            case "PageUp":
            case " ":
                if (e.key === " " && e.shiftKey || e.key === "PageUp") {
                    scrollLeft = Math.max(scrollLeft - pageStep, 0);
                    break;
                }
            case "PageDown":
            case " ":
                scrollLeft = Math.min(scrollLeft + pageStep, maxScrollLeft);
                break;
            default:
                return; // Exit for unsupported keys
        }

        // Prevent the default scrolling behavior
        e.preventDefault();

        // Update content scroll and scrollbar thumb
        piContainer.scrollLeft = scrollLeft;
        const thumbPosition = (scrollLeft / maxScrollLeft) * (scrollbarWidth - thumbWidth);
        thumb.style.left = `${thumbPosition}px`;
        scrollbar.setAttribute("aria-valuenow", Math.round((scrollLeft / maxScrollLeft) * 100));
    });
});