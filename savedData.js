chrome.storage.local.get(null, function (data) {
  // 'data' contains all the stored data from local storage

  const savedDataDiv = document.getElementById("savedData");

  // Loop through the data and create HTML elements
  for (const website in data) {
    if (data.hasOwnProperty(website)) {
      const notes = data[website];
      const websiteDiv = document.createElement("div");
      websiteDiv.classList.add("website-entry");

      const websiteHeading = document.createElement("p");
      websiteHeading.classList.add("website-title");
      websiteHeading.textContent = website.toUpperCase();

      websiteDiv.appendChild(websiteHeading);

      for (const note of notes) {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("note-entry");

        const idParagraph = document.createElement("p");
        idParagraph.classList.add("entry-title");
        idParagraph.textContent = note.title;

        entryDiv.appendChild(idParagraph);

        const passwordParagraph = document.createElement("p");
        passwordParagraph.classList.add("entry-note");

        if (note.note.includes("\n")) {
          const lines = note.note.split("\n");
          for (const line of lines) {
            const lineElement = document.createElement("p");
            lineElement.textContent = line;
            passwordParagraph.appendChild(lineElement);
          }
        } else {
          passwordParagraph.textContent = note.note;
        }

        entryDiv.appendChild(passwordParagraph);

        // Add delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "x";
        deleteButton.addEventListener("click", function () {
          // Delete the note from storage and update the UI
          chrome.storage.local.get(website, function (result) {
            const notesArray = result[website].filter(
              (n) => n.title !== note.title
            );

            if (notesArray.length === 0) {
              // Delete the key from storage if 'notesArray' is empty
              chrome.storage.local.remove(website, function () {
                entryDiv.remove();
              });
            } else {
              chrome.storage.local.set({ [website]: notesArray }, function () {
                entryDiv.remove();
              });
            }
          });
        });

        entryDiv.appendChild(deleteButton);

        websiteDiv.appendChild(entryDiv);
      }

      savedDataDiv.appendChild(websiteDiv);
    }
  }
});
