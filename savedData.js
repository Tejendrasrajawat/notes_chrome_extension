chrome.storage.local.get(null, function (data) {
  // 'data' contains all the stored data from local storage

  const savedDataDiv = document.getElementById("savedData");

  // Loop through the data and create HTML elements
  for (const website in data) {
    if (data.hasOwnProperty(website)) {
      const notes = data[website];
      const websiteDiv = document.createElement("div");
      websiteDiv.classList.add("website-entry"); // Add a class for styling

      const websiteHeading = document.createElement("h3");
      websiteHeading.textContent = website;

      websiteDiv.appendChild(websiteHeading);

      // Loop through notes for this website
      for (const note of notes) {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("note-entry"); // Add a class for styling
        const idParagraph = document.createElement("p");
        idParagraph.textContent = "Title: " + note.title;

        entryDiv.appendChild(idParagraph);

        const passwordParagraph = document.createElement("p");

        if (note.note.includes("\n")) {
          const lines = note.note.split("\n");
          const formattedNote = lines.join("<br>");
          passwordParagraph.innerHTML = "Note: " + formattedNote;
        } else {
          passwordParagraph.textContent = "Note: " + note.note;
        }

        entryDiv.appendChild(passwordParagraph);
        websiteDiv.appendChild(document.createElement("br"));
        websiteDiv.appendChild(entryDiv);
        websiteDiv.style.borderBottom = "1px solid";
      }

      savedDataDiv.appendChild(websiteDiv);
    }
  }
});
