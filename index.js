document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0];
    var url = new URL(tab.url);
    var domain = url.hostname;

    const website = document.getElementById("website");
    website.value = domain;
  });
  const autoFillButton = document.getElementById("saved");
  autoFillButton.addEventListener("click", function () {
    window.location.href = "savedData.html";
  });
});

document.getElementById("save").addEventListener("click", function () {
  const title = document.getElementById("title").value;
  const note = document.getElementById("note").value;
  const website = document.getElementById("website").value;

  const data = {
    title: title,
    note: note,
  };
  if (title && note) {
    chrome.storage.local.set({ [website]: data }, function () {
      alert("Website, title, and note saved!");
    });
  } else {
    alert("Please fill all the fields.");
  }
});
