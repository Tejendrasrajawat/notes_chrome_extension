// send message and in callback check for reponse from background
chrome.runtime.sendMessage(
  { action: "getCredentials", website: window.location.hostname },
  function (response) {
    const title = response.title;
    const note = response.note;

    console.log(response);

    if (title && note) {
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

      // Create and add content to the popup
      const contentContainer = document.createElement("div");
      contentContainer.style.display = "flex";
      contentContainer.style.flexDirection = "column";
      contentContainer.style.gap = "10px";

      const flexContainer1 = document.createElement("div");
      const flexContainer2 = document.createElement("div");
      flexContainer1.style.display = "flex";
      flexContainer1.style.gap = "20px";
      flexContainer1.style.alignItems = "center";
      flexContainer2.style.display = "flex";
      flexContainer2.style.gap = "20px";
      flexContainer2.style.alignItems = "center";

      const idElement = document.createElement("p");
      idElement.textContent = "Title: " + title;

      idElement.style.color = "black";

      const passwordElement = document.createElement("p");
      if (note.includes("\n")) {
        const lines = note.split("\n");
        const formattedNote = lines.join("<br>");
        passwordElement.innerHTML = "Note: " + formattedNote;
      } else {
        passwordElement.textContent = "Note: " + note;
      }

      passwordElement.style.color = "black";

      contentContainer.appendChild(flexContainer1);
      flexContainer1.appendChild(idElement);

      contentContainer.appendChild(flexContainer2);
      flexContainer2.appendChild(passwordElement);

      popup.appendChild(closeIcon); // Add close icon to the popup
      popup.appendChild(contentContainer); // Add the content container

      // Append the popup to the <body> element
      document.body.appendChild(popup);
    }
  }
);
