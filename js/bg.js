const color='pink'

chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.sync.set({color})
})