// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === "updateIcon") {
        if (msg.value) {
            chrome.browserAction.setIcon({path: "iconaa128g.png"});
            chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
			chrome.browserAction.setBadgeText({text: msg.count.toString()});
        } else {
            chrome.browserAction.setIcon({path: "iconaa128.png"});
        }
    }
});