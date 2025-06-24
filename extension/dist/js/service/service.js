"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const baseUrl = "http://localhost:3000/";
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let clientResponse = "loading";
    if (message.message === 'get-image-description') {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${baseUrl}?url=${encodeURIComponent(message.payload)}`);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const json = yield response.text();
                clientResponse = JSON.stringify(json);
            }
            catch (error) {
                console.log(error);
                clientResponse = "Sorry, an error occurred.";
            }
            sendResponse(`img receieved ${clientResponse}`);
        }))();
        return true;
    }
});
//# sourceMappingURL=service.js.map