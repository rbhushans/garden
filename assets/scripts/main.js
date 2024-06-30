//@ts-check

// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function () {
  // @ts-ignore
  const vscode = acquireVsCodeApi();
  var clickXCoord;
  var clickYCoord;

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
    //     debug.textContent?.concat("\n START ", JSON.stringify(plants)) ??
    //     " END";
    // }

    if (div) {
      div.textContent = "";
      for (const plant of plants) {
        const img = document.createElement("img");
        img.src = plant.source;
        img.style.left = plant.xcoord + "%";
        img.style.top = plant.ycoord + "%";
        img.id = plant.id;
        img.onmousedown = () => removePlantMouseDown(plant.id);
        img.onmouseup = removePlantMouseUp;
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
      img.onmousedown = addPlantMouseDown;
      img.onmouseup = addPlantMouseUp;
      document.body.style.backgroundColor = backgroundColor;
    }
    const closeButton = document.getElementById("close-modal");
    if (closeButton) {
      closeButton.onclick = closeModal;
    }
    const optionButtons = document.getElementsByClassName("plant-option");
    for (let i = 0; i < optionButtons.length; i++) {
      optionButtons[i].addEventListener("click", () => {
        closeModal();
        sendAddPlantMessage(optionButtons[i].textContent);
      });
    }
  }

  var plantPressTimer;
  var backgroundPressTimer;

  /**
   *
   * @param {string} id
   * @returns
   */
  function removePlantMouseDown(id) {
    plantPressTimer = window.setTimeout(function () {
      vscode.postMessage({
        type: "removePlant",
        value: id
      });
    }, 1000);
    return false;
  }

  function removePlantMouseUp() {
    clearTimeout(plantPressTimer);
    return false;
  }

  function addPlantMouseDown(event) {
    var rect = event.target.getBoundingClientRect();
    var x = event.clientX - rect.left; //x position within the element.
    var y = event.clientY - rect.top; //y position within the element.
    const img = document.getElementById("background-img");
    const maxHeight = img?.clientHeight ?? window.screen.height;
    const maxWidth = img?.clientWidth ?? window.screen.width;
    clickXCoord = (x / maxWidth) * 100 - 14;
    clickYCoord = (y / maxHeight) * 100 - 25;
    backgroundPressTimer = window.setTimeout(function () {
      const modal = document.getElementById("plant-modal");

      if (modal) {
        modal.style.display = "block";
      }
    }, 1000);
    return false;
  }

  function addPlantMouseUp() {
    clearTimeout(backgroundPressTimer);
    return false;
  }

  function closeModal() {
    const modal = document.getElementById("plant-modal");

    if (modal) {
      modal.style.display = "none";
    }
  }

  function sendAddPlantMessage(type) {
    vscode.postMessage({
      type: "addPlant",
      value: {
        type: type,
        xcoord: clickXCoord,
        ycoord: clickYCoord
      }
    });
  }
})();
