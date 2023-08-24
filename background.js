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
  }
});
