"use strict";
let activeImg = null;
function makeImagesTabbable(root = document) {
    const images = root.querySelectorAll('img');
    images.forEach((img) => {
        if (!img.hasAttribute('tabindex')) {
            img.setAttribute('tabindex', '0');
        }
    });
}
document.addEventListener('focusin', (event) => {
    const target = event.target;
    if (target.tagName === 'IMG') {
        const img = target;
        const src = img.currentSrc;
        if (src) {
            console.log('Focused image src:', src);
            activeImg = src;
            console.log(activeImg);
        }
    }
});
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === "\\") {
        e.preventDefault();
        // https://developer.chrome.com/docs/extensions/reference/api/runtime
        console.log('Active img ' + activeImg);
        chrome.runtime.sendMessage({ message: 'get-image-description', payload: activeImg }, (response) => {
            activeImg = null;
            console.log('received user data', response);
        });
    }
});
const callback = (mutations, observer) => {
    for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node;
                if (element.tagName === 'IMG') {
                    if (!element.hasAttribute('tabindex')) {
                        element.setAttribute('tabindex', '0');
                    }
                }
                else {
                    makeImagesTabbable(element);
                }
            }
        });
    }
};
const observer = new MutationObserver(callback);
const config = { childList: true, subtree: true };
observer.observe(document.body, config);
function isImage(element) {
    return element instanceof HTMLImageElement;
}
makeImagesTabbable();
//# sourceMappingURL=script.js.map