chrome.runtime.sendMessage(
  { action: "getCredentials", website: window.location.hostname },
  function (response) {
    // Create a popup modal
    const popup = document.createElement("div");
    popup.classList.add("popup-container");

    for (const entry of response) {
      let title = entry.title;
      let note = entry.note;
      let id = entry.id;

      // Create and add content to the popup
      const card = document.createElement("div");
      card.classList.add("card", "slide-in");

      // Create a close icon
      const closeIcon = document.createElement("span");
      closeIcon.textContent = "x";
      closeIcon.classList.add("close-icon");

      // Add an event listener to close the popup when the close icon is clicked
      closeIcon.addEventListener("click", function () {
        card.remove();
        if (!popup.innerHTML) {
          popup.remove();
        }
      });

      card.appendChild(closeIcon);

      const titleElement = document.createElement("h2");
      titleElement.textContent = title;
      card.appendChild(titleElement);

      const noteElement = document.createElement("p");

      if (note.includes("\n")) {
        const lines = note.split("\n");
        for (const line of lines) {
          const noteLineElement = document.createElement("p");
          noteLineElement.textContent = line;

          card.appendChild(noteLineElement);
        }
      } else {
        noteElement.textContent = note;
        card.appendChild(noteElement);
      }

      // Add delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-button");

      deleteButton.addEventListener("click", function () {
        // Remove the note from the response array
        const updatedResponse = response.filter((item) => item.title !== title);

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

      popup.appendChild(card); // Add the card

      // Append the popup to the <body> element
      document.body.appendChild(popup);
    }
  }
);
