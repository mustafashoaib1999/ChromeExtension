let extensionPause = false       
function videoPause() {
    const video = document.querySelector("video")
    if (video && !video.paused) {   
        extensionPause = true     
        video.pause()                   
    }
}

function videoResume() {
    const video = document.querySelector("video") 
    if (video && video.paused && extensionPause) { 
        extensionPause = false 
        video.play()              
    }
}

function handleVisibilityChange() {
    if (document.hidden) { 
        videoPause() 
    } else {
        videoResume() 
    }
}

function monitorManualPause() {
    const video = document.querySelector("video") 
    if (video) {                                  
        video.addEventListener('pause', () => { if (!extensionPause) {            
                extensionPause = false        
            }
        }) 

        video.addEventListener('play', () => {      
            if (!document.hidden) {                
                extensionPause = false        
            }
        }) 
    }
}

document.addEventListener("visibilitychange", handleVisibilityChange)
                                                                        
monitorManualPause() 

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => { 
    if (message.action == "videoPause") {                              
videoPause() 
    } else if (message.action == "videoResume") {
        videoResume() 
    } else if (message.action == "checkTab") {
        if (!document.hidden) {
            videoResume() 
        } else {
            videoPause() 
        }
    }
}) 
