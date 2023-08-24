chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getCredentials") {
    chrome.storage.local.get(request.website, function (data) {
      const credentials = data[request.website];
      console.log(credentials);
      if (credentials) {
        sendResponse(credentials);
      } else {
        sendResponse(credentials);
      }
    });
    // Return true to indicate that the response will be sent asynchronously
    return true;
  } else if (request.action === "updateNotes") {
    chrome.storage.local.get(request.website, function (data) {
      const credentials = data[request.website];
      if (credentials) {
        credentials.notes = request.notes;
        chrome.storage.local.set(
          { [request.website]: credentials },
          function () {
            sendResponse({ success: true });
          }
        );
      } else {
        sendResponse({ success: false });
      }
    });
    return true;
  }
});
