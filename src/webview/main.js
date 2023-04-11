//@ts-check

// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function () {
  const vscode = acquireVsCodeApi();

  // Handle messages sent from the extension to the webview
  window.addEventListener("message", (event) => {
    const message = event.data; // The json data that the extension sent
    switch (message.type) {
      case "waterPlants": {
        waterPlants(message.value);
        break;
      }
      case "updatePlants": {
        updatePlants(message.value);
        break;
      }
    }
  });

  /**
   * @param {number} waterLevel
   */
  function waterPlants(waterLevel) {
    // water the plants by increasing size of div
    const waterLevelObj = document.getElementById("water-level");
    if (waterLevelObj) {
      waterLevelObj.style.height = `${waterLevel}px`;
    }
  }

  /**
   * @param {Array<string>} plants
   */
  function updatePlants(plants) {
    const ul = document.getElementById("plant-list");
    if (ul) {
      ul.textContent = "";
      for (const plant of plants) {
        const li = document.createElement("li");
        li.className = "plant-item";
        li.innerHTML = plant;

        ul.appendChild(li);
      }
    }
  }
})();
