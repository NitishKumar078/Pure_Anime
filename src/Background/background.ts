/**
 * This is background script of the chrome extention
 *
 */
let ignoreUrls = [
  "https://www.google.com/",
  "chrome://newtab/",
  "https://aniwatchtv.to/",
  "https://www.miruro.tv/",
  "https://zorotv.com.in/",
];

const updateIcon = (isActive: boolean) => {
  const icon = isActive ? "active_icon" : "icon";
  chrome.action.setIcon(
    {
      path: {
        16: `icons/${icon}16.png`,
        32: `icons/${icon}32.png`,
        48: `icons/${icon}48.png`,
      },
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error("Error setting icon:", chrome.runtime.lastError);
      } else {
        console.log(`Icon ${icon} set successfully.`);
      }
    }
  );
};

// Sync icon on startup and install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get("active-status", (result) => {
    updateIcon(result["active-status"] === "true");
  });
});

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get("active-status", (result) => {
    updateIcon(result["active-status"] === "true");
  });
});

chrome.runtime.onMessage.addListener(({ action }, _, sendResponse) => {
  if (action === "activate" || action === "normal") {
    const isActive = action === "activate";
    updateIcon(isActive);
    chrome.storage.local.set({ "active-status": isActive ? "true" : "false" });
  }
});

// Listener for when the active tab changes
chrome.tabs.onActivated.addListener(function (activeInfo) {
  // Retrieve active-status from local storage
  chrome.storage.local.get("active-status", function (result) {
    if (result["active-status"] === "true") {
      // Get details about the active tab
      chrome.tabs.get(activeInfo.tabId, function (tab) {
        console.log("Tab activated: ", tab);

        // Check if the tab should be closed
        if (
          tab.id &&
          tab.openerTabId &&
          tab.pendingUrl &&
          !ignoreUrls.includes(tab.pendingUrl)
        ) {
          chrome.tabs.remove(activeInfo.tabId, function () {
            console.log("Tab closed: ", activeInfo.tabId);
            if (tab.openerTabId) {
              chrome.tabs.sendMessage(tab.openerTabId, { action: "simulate_click" }).catch(err => console.log("Could not simulate click:", err));
            }
          });
        }
      });
    }
  });
});
