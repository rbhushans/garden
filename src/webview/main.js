//@ts-check

// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function () {
  // @ts-ignore
  const vscode = acquireVsCodeApi();

  // Handle messages sent from the extension to the webview
  window.addEventListener("message", (event) => {
    const message = event.data; // The json data that the extension sent
    switch (message.type) {
      case "updateWater": {
        updateWater(message.value);
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
  function updateWater(waterLevel) {
    const waterDiv = document.getElementById("water-level");
    if (waterDiv) {
      waterDiv.style.display = "block";
    }
    // water the plants by increasing size of div
    const waterLevelObj = document.getElementById("water-level");
    if (waterLevelObj) {
      waterLevelObj.style.height = `${waterLevel}px`;
    }
  }

  /**
   * @param {Array<object>} plants
   */
  function updatePlants(plants) {
    const mainDiv = document.getElementById("main-div");
    if (mainDiv) {
      mainDiv.style.display = "block";
    }

    const loadingDiv = document.getElementById("loading-div");
    if (loadingDiv) {
      loadingDiv.style.display = "none";
    }

    const div = document.getElementById("plant-list");
    if (div) {
      div.textContent = "";
      for (const plant of plants) {
        const img = document.createElement("img");
        img.src = plant.source;
        img.style.left = plant.xcoord + "px";
        img.style.top = plant.ycoord + "px";
        img.classList.add("plant-img");
        img.title = plant.type;

        div.appendChild(img);
      }
    }
  }
})();
