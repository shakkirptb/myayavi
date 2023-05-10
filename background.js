// chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
//   var currentUrl = tabs[0].url;
//
//   chrome.tabs.create({url: 'https://example.com'});
// });

chrome.runtime.onMessage.addListener(async function (
  { type, url },
  sender,
  sendResponse
) {
  if (type === "fetch") {
    sendResponse(await fetch(url));
  }
});
