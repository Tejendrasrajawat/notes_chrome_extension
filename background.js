chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getCredentials") {
    chrome.storage.local.get(request.website, function (data) {
      const credentials = data[request.website];

      if (credentials) {
        sendResponse(credentials);
      }
    });
    // Return true to indicate that the response will be sent asynchronously
    return true;
  } else if (request.action === "updateNotes") {
    chrome.storage.local.get(request.website, function (data) {
      const credentials = data[request.website];

      if (credentials) {
        // Check if the 'notes' array is empty
        if (request.notes.length === 0) {
          // Delete the key from storage if 'notes' array is empty
          chrome.storage.local.remove(request.website, function () {
            sendResponse({ success: true });
          });
        } else {
          // Update the 'notes' array in storage
          chrome.storage.local.set(
            { [request.website]: request.notes },
            function () {
              sendResponse({ success: true });
            }
          );
        }
      } else {
        sendResponse({ success: false });
      }
    });

    return true;
  }
});
