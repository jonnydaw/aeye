const baseUrl = "http://localhost:3000/"
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  let clientResponse = "loading";
  if (message.message === 'get-image-description') {
    (async () => {
      try {
        const response = await fetch(`${baseUrl}?url=${encodeURIComponent(message.payload)}`);
        
        if(!response.ok){
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.text();
        clientResponse = JSON.stringify(json);
      } catch (error: any) {
        console.log(error)
          clientResponse = "Sorry, an error occurred."
      }
      sendResponse(`img receieved ${clientResponse}`);
    })();
    
    return true;
  }
});

