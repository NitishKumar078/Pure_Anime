/**
 * This is background script of the chrome extention
 *
 */
let ignoreUrls = ["https://www.google.com/", "chrome://newtab/"];

chrome.runtime.onMessage.addListener(({ action }, _, sendResponse) => {
  const icon = action === "activate" ? "active_icon" : "icon";
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
        console.error(
          `Error setting ${action} icon:`,
          chrome.runtime.lastError
        );
      } else {
        console.log(`${action.toUpperCase()} icon set successfully.`);
      }
    }
  );

  // activate the funtionaly of the extention
  // Listener for when the active tab changes
  if (action === "activate") {
    chrome.tabs.onActivated.addListener(function (activeInfo) {
      chrome.tabs.get(activeInfo.tabId, function (tab) {
        console.log("Tab activated: ", tab);
        if (
          tab.openerTabId &&
          tab.pendingUrl &&
          !ignoreUrls.includes(tab.pendingUrl)
        ) {
          chrome.tabs.remove(activeInfo.tabId, function () {
            console.log("Tab closed: ", activeInfo.tabId);
          });
        }
      });
    });
  }
});
