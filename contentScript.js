// Send a message to the background script to get credentials
chrome.runtime.sendMessage(
  { action: "getCredentials", website: window.location.hostname },
  function (response) {
    console.log({ response });
    // Create a popup modal
    const popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = "2%";
    popup.style.right = "2%";
    popup.style.padding = "20px";
    popup.style.backgroundColor = "#ffffff";
    popup.style.border = "1px solid #000000";
    popup.style.borderRadius = "5px";
    popup.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
    popup.style.zIndex = "9999";
    popup.style.width = "auto";

    // Create a close icon
    const closeIcon = document.createElement("span");
    closeIcon.style.position = "absolute";
    closeIcon.style.top = "10px";
    closeIcon.style.right = "10px";
    closeIcon.style.cursor = "pointer";
    closeIcon.innerHTML = "&times;"; // Unicode for 'times' (multiplication) symbol
    closeIcon.style.color = "red";

    // Add an event listener to close the popup when the close icon is clicked
    closeIcon.addEventListener("click", function () {
      document.body.removeChild(popup);
    });

    for (const entry of response) {
      let title = entry.title;
      let note = entry.note;
      console.log(note, title);

      // Create and add content to the popup
      const contentContainer = document.createElement("div");
      contentContainer.style.display = "flex";
      contentContainer.style.flexDirection = "column";
      contentContainer.style.gap = "10px";

      const titleElement = document.createElement("p");
      titleElement.textContent = "Title: " + title;
      titleElement.style.color = "black";
      contentContainer.appendChild(titleElement);

      const noteElement = document.createElement("p");
      if (note.includes("\n")) {
        const lines = note.split("\n");
        for (const line of lines) {
          const lineElement = document.createElement("p");
          lineElement.innerHTML = "Note: " + line;
          lineElement.style.color = "black";
          contentContainer.appendChild(lineElement);
        }
      } else {
        noteElement.textContent = "Note: " + note;
        noteElement.style.color = "black";
        contentContainer.appendChild(noteElement);
      }

      popup.appendChild(closeIcon); // Add close icon to the popup
      popup.appendChild(contentContainer); // Add the content container

      // Append the popup to the <body> element
      document.body.appendChild(popup);
    }
  }
);
