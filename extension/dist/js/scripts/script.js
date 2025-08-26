"use strict";
let activeImg = null;
function hi() {
    console.log("hi");
}
function makeImagesTabbable(root = document) {
    console.log("tabs");
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
        console.log(activeImg);
        chrome.runtime.sendMessage({ message: 'get-image-description', payload: activeImg }, (response) => {
            activeImg = null;
            console.log('received user data', response);
        });
    }
});
const observer = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node;
                if (element.tagName === 'IMG') {
                    element.setAttribute('tabindex', '0');
                }
                else {
                    makeImagesTabbable(element);
                }
            }
        });
    }
});
observer.observe(document.body, {
    childList: true,
    subtree: true,
});
function isImage(element) {
    return element instanceof HTMLImageElement;
}
makeImagesTabbable();
hi();
//# sourceMappingURL=script.js.map