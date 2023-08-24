chrome.storage.local.get(null, function (data) {
  // 'data' contains all the stored data from local storage

  const savedDataDiv = document.getElementById("savedData");

  // Loop through the data and create HTML elements
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const entry = data[key];

      const entryDiv = document.createElement("div");
      entryDiv.classList.add("entry"); // Add a class for styling

      const websiteHeading = document.createElement("h3");
      websiteHeading.textContent = key;

      // Add a cross icon for removal
      const removeIcon = document.createElement("span");
      removeIcon.classList.add("remove-icon");
      removeIcon.innerHTML = "&times;"; // Unicode for 'times' (multiplication) symbol
      removeIcon.addEventListener("click", function () {
        // Remove the entry from storage and update the UI
        chrome.storage.local.remove(key, function () {
          entryDiv.remove();
        });
      });

      websiteHeading.appendChild(removeIcon);
      entryDiv.appendChild(websiteHeading);

      const idParagraph = document.createElement("p");
      idParagraph.textContent = "Title: " + entry.title;

      entryDiv.appendChild(idParagraph);

      const passwordParagraph = document.createElement("p");

      if (entry.note.includes("\n")) {
        const lines = entry.note.split("\n");
        const formattedNote = lines.join("<br>");
        passwordParagraph.innerHTML = "Note: " + formattedNote;
      } else {
        passwordParagraph.textContent = "Note: " + entry.note;
      }
      entryDiv.appendChild(passwordParagraph);

      savedDataDiv.appendChild(entryDiv);
    }
  }
});
