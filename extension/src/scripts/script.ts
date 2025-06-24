
let activeImg: string | null = null; 

document.addEventListener('focusin', (e: FocusEvent) => {
    let active = document.activeElement;

    let parent = active?.parentElement;
    if(parent){
        const source = extractImgSrcFromHTMLCollection(parent.children);
        if(source){
            activeImg = source
        }

    }
})

document.addEventListener('keydown', (e: KeyboardEvent) => {
    if(e.ctrlKey && e.key === "\\"){
        e.preventDefault();
        // https://developer.chrome.com/docs/extensions/reference/api/runtime
        chrome.runtime.sendMessage({message: 'get-image-description', payload: activeImg}, (response) => {
            // save activeImg response
            console.log("sent");
            activeImg = null;
            console.log('received user data', response);
        });
    }
})

function extractImgSrcFromHTMLCollection(collection: HTMLCollection): string | null{
    const elements = Array.from(collection);
    for(const element of elements){
        if(element.getElementsByTagName("img").length > 0){
            return (element.getElementsByTagName("img")[0].currentSrc);
            
        };
    }
    return null;
}