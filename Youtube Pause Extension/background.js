chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, tab => {  
        if (tab.url.includes("youtube.com")) {
            chrome.tabs.sendMessage(tab.id, { action: "videoResume" });            
        }
    })
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    if (changeInfo.status === "complete" && tab.url.includes("youtube.com")) {
        chrome.tabs.sendMessage(tabId, { action: "checkTab" });
}
});

chrome.windows.onFocusChanged.addListener(windowId => {

    if (windowId === chrome.windows.WINDOW_ID_NONE) {

        chrome.tabs.query({}, tabs => {

            tabs.forEach(tab => {
                if (tab.url.includes("youtube.com")) {
                    chrome.tabs.sendMessage(tab.id, { action: "videoPause" })
                }
            })
        })
    } else {
        chrome.windows.get(windowId, { populate: true }, window => {
            window.tabs.forEach(tab => {
                if (tab.active && tab.url.includes("youtube.com")) {
                    chrome.tabs.sendMessage(tab.id, { action: "videoResume" })
                }
            })
        })
    }
})
