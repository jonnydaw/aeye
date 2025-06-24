"use strict";
let activeImg = null;
document.addEventListener('focusin', (e) => {
    let active = document.activeElement;
    let parent = active === null || active === void 0 ? void 0 : active.parentElement;
    if (parent) {
        const source = extractImgSrcFromHTMLCollection(parent.children);
        if (source) {
            activeImg = source;
        }
    }
});
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === "\\") {
        e.preventDefault();
        // https://developer.chrome.com/docs/extensions/reference/api/runtime
        chrome.runtime.sendMessage({ message: 'get-image-description', payload: activeImg }, (response) => {
            // save activeImg response
            console.log("sent");
            activeImg = null;
            console.log('received user data', response);
        });
    }
});
function extractImgSrcFromHTMLCollection(collection) {
    const elements = Array.from(collection);
    for (const element of elements) {
        if (element.getElementsByTagName("img").length > 0) {
            return (element.getElementsByTagName("img")[0].currentSrc);
        }
        ;
    }
    return null;
}
//# sourceMappingURL=script.js.map