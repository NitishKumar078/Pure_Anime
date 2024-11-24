/**
 * This is content script of the chrome extention
 *
 */

chrome.runtime.onMessage.addListener(({ action }, _, sendResponse) => {
  if (action === "remove_top_layer") {
    const gettoplayer = document.querySelectorAll("*");
    gettoplayer.forEach((element) => {
      if (element instanceof HTMLElement) {
        if (checkCondition(element)) {
          element.remove();
        }
      }
    });
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
    cssObj.getPropertyValue("z-index") >= "1000"
  );
  {
  }
}
