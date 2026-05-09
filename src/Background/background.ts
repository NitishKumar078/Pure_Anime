/**
 * This is background script of the chrome extention
 *
 */
const baseUrls = [
  "https://www.google.com/",
  "chrome://newtab/",
];

const isAllowedUrl = (url: string, storedAnimes: any[]) => {
  if (!url) return false;
  if (baseUrls.some(bUrl => url.startsWith(bUrl))) return true;

  if (storedAnimes && Array.isArray(storedAnimes) && storedAnimes.length > 0) {
    return storedAnimes.some(anime => {
      try {
        const hostname = new URL(anime.link).hostname.replace(/^www\./, "");
        return url.toLowerCase().includes(hostname.toLowerCase());
      } catch {
        return url.toLowerCase().includes(anime.link.toLowerCase());
      }
    });
  }

  // Fallback if storage is empty
  const fallbackUrls = [
    "aniwatchtv.to",
    "miruro.tv",
    "zorotv.com.in",
  ];
  return fallbackUrls.some(fallback => url.toLowerCase().includes(fallback));
};

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

const initIcon = () => {
  chrome.storage.local.get("active-status", (result) => {
    updateIcon(result["active-status"] === "true");
  });
};

// Sync icon on startup, install, and service worker wake-up (like dev reload)
chrome.runtime.onInstalled.addListener(initIcon);
chrome.runtime.onStartup.addListener(initIcon);
initIcon();

chrome.runtime.onMessage.addListener(({ action }, _, sendResponse) => {
  if (action === "activate" || action === "normal") {
    const isActive = action === "activate";
    updateIcon(isActive);
    chrome.storage.local.set({ "active-status": isActive ? "true" : "false" });
  }
});

// Listener for when the active tab changes
chrome.tabs.onActivated.addListener(function (activeInfo) {
  // Retrieve active-status and animes list from local storage
  chrome.storage.local.get(["active-status", "animes"], function (result) {
    if (result["active-status"] === "true") {
      // Get details about the active tab
      chrome.tabs.get(activeInfo.tabId, function (tab) {
        console.log("Tab activated: ", tab);

        // Check if the tab should be closed
        if (
          tab.id &&
          tab.openerTabId &&
          tab.pendingUrl &&
          !isAllowedUrl(tab.pendingUrl, result["animes"])
        ) {
          chrome.tabs.remove(activeInfo.tabId, function () {
            console.log("Tab closed: ", activeInfo.tabId);
            
            if (tab.openerTabId) {
              // Only simulate click if the opener tab is an allowed URL
              chrome.tabs.get(tab.openerTabId, function (openerTab) {
                if (openerTab.url && isAllowedUrl(openerTab.url, result["animes"])) {
                  chrome.tabs.sendMessage(tab.openerTabId!, { action: "simulate_click" })
                    .catch(err => console.log("Could not simulate click:", err));
                }
              });
            }
          });
        }
      });
    }
  });
});
