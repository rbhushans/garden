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
      case "updateBackground": {
        updateBackground(message.value.uri, message.value.backgroundColor);
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
      waterLevelObj.style.height = `${
        Number(waterLevel) < 1 ? 0 : waterLevel
      }%`;
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
    // const debug = document.getElementById("debugger");
    // if (debug) {
    //   debug.textContent =
    //     debug.textContent?.concat("\n START ", plants.toString()) ?? " END";
    // }

    if (div) {
      div.textContent = "";
      for (const plant of plants) {
        const img = document.createElement("img");
        img.src = plant.source;
        img.style.left = plant.xcoord + "%";
        img.style.top = plant.ycoord + "%";
        img.classList.add("plant-img");
        img.title = plant.source;
        // img.style.height = plant.scale * 24 + "vw";
        // img.style.width = plant.scale * 24 + "vw";

        div.appendChild(img);
      }
    }
  }

  /**
   * @param {string} backgroundUri
   * @param {string} backgroundColor
   */
  function updateBackground(backgroundUri, backgroundColor) {
    // update image
    const img = document.getElementById("background-img");
    if (img) {
      // @ts-ignore
      img.src = backgroundUri;
      document.body.style.backgroundColor = backgroundColor;
    }
  }
})();
