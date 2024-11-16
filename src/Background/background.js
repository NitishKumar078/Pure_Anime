/**
 * This is background script of the chrome extention
 *
 */
console.log("hello world... from the background script");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "set-active") {
    chrome.action.setIcon(
      {
        path: {
          16: "icons/active_icon16.png",
          32: "icons/active_icon32.png",
          48: "icons/active_icon48.png",
        },
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error("Error setting active icon:", chrome.runtime.lastError);
        } else {
          console.log("Active icon set successfully.");
        }
      }
    );
  } else if (message.action === "set-normal") {
    chrome.action.setIcon(
      {
        path: {
          16: "icons/icon16.png",
          32: "icons/icon32.png",
          48: "icons/icon48.png",
        },
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error("Error setting normal icon:", chrome.runtime.lastError);
        } else {
          console.log("Normal icon set successfully.");
        }
      }
    );
  }
});
