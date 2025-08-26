
let activeImg: string | null = null; 


function makeImagesTabbable(root: ParentNode = document) {
  const images = root.querySelectorAll('img');
  images.forEach((img: HTMLImageElement) => {
    if (!img.hasAttribute('tabindex')) {
      img.setAttribute('tabindex', '0');
    }
  });
}


document.addEventListener('focusin', (event: FocusEvent) => {
  const target = event.target as HTMLElement;
  if (target.tagName === 'IMG') {
    const img = target as HTMLImageElement;
    const src = img.currentSrc;
    if (src) {
      console.log('Focused image src:', src);
      activeImg = src;
      console.log(activeImg);
    }
  }
});


document.addEventListener('keydown', (e: KeyboardEvent) => {
    if(e.ctrlKey && e.key === "\\"){
        e.preventDefault();
        // https://developer.chrome.com/docs/extensions/reference/api/runtime
        console.log('Active img ' + activeImg);
        chrome.runtime.sendMessage({message: 'get-image-description', payload: activeImg}, (response) => {
            activeImg = null;
            console.log('received user data', response);
        });
    }
})

const callback = (mutations: MutationRecord[], observer: MutationObserver) =>{
  for (const mutation of mutations) {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        if (element.tagName === 'IMG') {
          if(!element.hasAttribute('tabindex')){
            (element as HTMLImageElement).setAttribute('tabindex', '0');
          }
        } else {
          makeImagesTabbable(element);
        }
      }
    });
  }
}
const observer = new MutationObserver(callback)
const config = { childList: true, subtree: true}
observer.observe(document.body, config);

function isImage(element: Element): boolean {
    return element instanceof HTMLImageElement;
}

makeImagesTabbable();