// check for data in background - if exist then send response to contentscript
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getCredentials") {
    chrome.storage.local.get(request.website, function (data) {
      const credentials = data[request.website];
      if (credentials) {
        sendResponse({ title: credentials.title, note: credentials.note });
      } else {
        sendResponse({ title: null, note: null });
      }
    });
  }
  return true;
});
