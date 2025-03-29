/**
 * This is content script of the chrome extention
 *
 */

let intervalId: NodeJS.Timeout | null = null;

chrome.runtime.onMessage.addListener(({ action }, _, sendResponse) => {
  if (action === "remove_top_layer") {
    // Example usage
    handleAction({ type: "remove_top_layer" });
  } else if (action === "stop") {
    // Later, when you want to stop
    handleAction({ type: "stop" });
  }
  return true;
});

function checkCondition(element: HTMLElement) {
  const cssObj = window.getComputedStyle(element);

  return (
    cssObj.getPropertyValue("position") === "absolute" &&
    cssObj.getPropertyValue("top") === "0px" &&
    cssObj.getPropertyValue("left") === "0px" &&
    cssObj.getPropertyValue("pointer-events") === "none" &&
    cssObj.getPropertyValue("z-index") >= "100"
  );
}

function handleAction(action: { type: string }) {
  switch (action.type) {
    case "remove_top_layer":
      const gettoplayer = document.querySelectorAll("*");
      let topLayerelement: HTMLElement | null = null;
      for (const element of gettoplayer) {
        if (element instanceof HTMLElement) {
          if (checkCondition(element)) {
            topLayerelement = element;
            element.style.display = "none";
            break;
          }
        }
      }

      if (topLayerelement) {
        setInterval(() => {
          if (topLayerelement) {
            topLayerelement.remove();
          }
        }, 500);
      }
      break;
    case "stop":
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      // Additional cleanup code if needed
      break;
    default:
      // Handle other action types if necessary
      break;
  }
}
