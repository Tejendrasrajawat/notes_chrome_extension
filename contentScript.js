chrome.runtime.sendMessage(
  { action: "getCredentials", website: window.location.hostname },
  function (response) {
    // Create a popup modal
    const popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = "5%";
    popup.style.right = "2%";
    popup.style.padding = "35px 10px";
    popup.style.backgroundColor = "#f8f9fa";
    popup.style.borderRadius = "10px";
    popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    popup.style.zIndex = "9999";
    popup.style.width = "300px";
    popup.style.maxWidth = "80%";
    popup.style.overflowY = "scroll";
    popup.style.height = "60vh";

    // Create a close icon
    const closeIcon = document.createElement("span");
    closeIcon.style.position = "absolute";
    closeIcon.style.top = "10px";
    closeIcon.style.right = "10px";
    closeIcon.style.cursor = "pointer";
    closeIcon.innerHTML = "&times;"; // Unicode for 'times' (multiplication) symbol
    closeIcon.style.fontSize = "20px";
    closeIcon.style.color = "#dc3545";

    // Add an event listener to close the popup when the close icon is clicked
    closeIcon.addEventListener("click", function () {
      document.body.removeChild(popup);
    });

    for (const entry of response) {
      let title = entry.title;
      let note = entry.note;
      console.log(note, title);

      // Create and add content to the popup
      const card = document.createElement("div");
      card.style.backgroundColor = "white";
      card.style.padding = "15px";
      card.style.borderRadius = "10px";
      card.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
      card.style.marginBottom = "15px";

      const titleElement = document.createElement("h2");
      titleElement.textContent = title;
      titleElement.style.marginTop = "0";
      titleElement.style.marginBottom = "10px";
      titleElement.style.color = "#333";

      const noteElement = document.createElement("p");
      card.appendChild(titleElement);

      if (note.includes("\n")) {
        const lines = note.split("\n");
        for (const line of lines) {
          const noteLineElement = document.createElement("p");
          noteLineElement.textContent = line;
          noteLineElement.style.margin = "0";
          noteLineElement.style.color = "#666";
          noteLineElement.style.lineHeight = "1.5";
          card.appendChild(noteLineElement);
        }
      } else {
        noteElement.textContent = note;
        card.appendChild(noteElement);
      }
      noteElement.style.margin = "0";
      noteElement.style.color = "#666";
      noteElement.style.lineHeight = "1.5";

      // Add delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.style.marginTop = "10px";
      deleteButton.style.padding = "5px 10px";
      deleteButton.style.border = "1px solid #dc3545";
      deleteButton.style.borderRadius = "5px";
      deleteButton.style.backgroundColor = "transparent";
      deleteButton.style.color = "#dc3545";
      deleteButton.style.cursor = "pointer";
      deleteButton.style.fontSize = "14px";
      deleteButton.addEventListener("click", function () {
        // Remove the note from the response array
        const updatedResponse = response.filter(
          (item) => item.title !== title && item.note !== note
        );
        // Update storage with the updated response
        chrome.runtime.sendMessage(
          {
            action: "updateNotes",
            website: window.location.hostname,
            notes: updatedResponse,
          },
          function () {
            // Remove the card from the UI
            card.remove();
          }
        );
      });
      card.appendChild(deleteButton);

      popup.appendChild(closeIcon); // Add close icon to the popup
      popup.appendChild(card); // Add the card

      // Append the popup to the <body> element
      document.body.appendChild(popup);
    }
  }
);
