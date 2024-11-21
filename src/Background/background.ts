/**
 * This is background script of the chrome extention
 *
 */
console.log("hello world... from the background script");
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
        console.log(`${action.capitalize()} icon set successfully.`);
      }
    }
  );
});
