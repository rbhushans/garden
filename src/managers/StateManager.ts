// This file houses the state manager used to read/write to global state
import * as vscode from "vscode";
import { DefaultState } from "../constants/State";
import { plantFiles, plantStringMap } from "../constants/Plants";
import { MathUtils } from "../utils/MathUtils";
import { Background } from "../types/Background";
import { Plant, plantLocation, plantType } from "../types/Plant";
import { SettingsManager } from "./SettingsManager";
import { ManagerUtils } from "../utils/ManagerUtils";

const getPlants = (context: vscode.ExtensionContext): string[] => {
  return context.globalState.get("plants") ?? [];
};

const getWaterLevel = (context: vscode.ExtensionContext): number => {
  return (
    context.globalState.get("waterLevel") ?? DefaultState.WATER_LEVEL_DEFAULT
  );
};

const getNotifyId = (
  context: vscode.ExtensionContext
): NodeJS.Timer | undefined => {
  return context.globalState.get("notifyId") ?? undefined;
};

const getBackground = (context: vscode.ExtensionContext): Background => {
  return (
    context.globalState.get("background") ?? DefaultState.BACKGROUND_DEFAULT
  );
};

const getPlantArray = (context: vscode.ExtensionContext): Plant[] => {
  return context.globalState.get("plantArray") ?? [];
};

const getIsModalActive = (context: vscode.ExtensionContext): boolean => {
  return context.globalState.get("isModalActive") ?? false;
};

const getIsProgramSettingsUpdate = (
  context: vscode.ExtensionContext
): boolean => {
  return context.globalState.get("isProgramSettingsUpdate") ?? false;
};

const removeSinglePlant = async (
  context: vscode.ExtensionContext,
  plantId: string
) => {
  const currentStatePlants = StateManager.getPlants(context);
  const currentStatePlantData = StateManager.getPlantArray(context);
  const currentBackground = getBackground(context);

  const indOfPlant = currentStatePlantData.findIndex((v) => v.id === plantId);
  if (indOfPlant !== -1) {
    currentStatePlants.splice(indOfPlant, 1);
    const plant = currentStatePlantData.splice(indOfPlant, 1);
    if (plant[0].plantAreaIndex !== -1) {
      currentBackground.plantAreas[plant[0].plantAreaIndex].occupationCount--;
    }
    await context.globalState.update("plants", currentStatePlants);
    await context.globalState.update("plantArray", currentStatePlantData);
    await updateBackground(context, currentBackground);
  }
};

const addSinglePlant = async (
  context: vscode.ExtensionContext,
  type: plantType,
  xcoord: number,
  ycoord: number
) => {
  const currentStatePlants = StateManager.getPlants(context);
  const currentStatePlantData = StateManager.getPlantArray(context);
  const currentBackground = SettingsManager.getBackground();
  let selectedInd = -1;
  let plantArea = null;
  for (let i = 0; i < currentBackground.plantAreas.length; i++) {
    const area = currentBackground.plantAreas[i];
    if (ManagerUtils.isCoordInBounds(xcoord, ycoord, area)) {
      selectedInd = i;
      plantArea = area;
      break;
    }
  }
  const plant: Plant = {
    type: type,
    xcoord: xcoord,
    ycoord: ycoord,
    source: plantFiles[type].source,
    location: plantFiles[type].location as plantLocation,
    plantAreaIndex: selectedInd,
    scale: plantArea?.scale ?? 1,
    id: `${type}_${xcoord}_${ycoord}`
  };
  if (selectedInd !== -1) {
    currentBackground.plantAreas[selectedInd].occupationCount--;
  }
  currentStatePlants.push(type);
  currentStatePlantData.push(plant);

  await context.globalState.update("plants", currentStatePlants);
  await context.globalState.update("plantArray", currentStatePlantData);
  await updateBackground(context, currentBackground);
};

const updatePlants = async (
  context: vscode.ExtensionContext,
  plants: string[]
) => {
  const currentBackground = getBackground(context);

  if (plants.length === 0) {
    await context.globalState.update("plants", []);
    await context.globalState.update("plantArray", []);
    await resetBackgroundState(context);
    return;
  }
  // get difference in list of plants
  const currentPlants = getPlants(context);
  const newPlants = plants.slice();

  // newPlants will have any extra plants added
  for (var i = 0; i < currentPlants.length; i++) {
    const plant = currentPlants[i];
    const index = newPlants.indexOf(plant);
    if (index !== -1) {
      newPlants.splice(index, 1);
    }
  }

  // currentPlants will have any plants removed
  for (var i = 0; i < plants.length; i++) {
    const plant = plants[i];
    const index = currentPlants.indexOf(plant);
    if (index !== -1) {
      currentPlants.splice(index, 1);
    }
  }

  // update list of plant names
  await context.globalState.update("plants", plants);

  // remove plants (this will in almost all cases be only a single one)
  const currentPlantArray = getPlantArray(context);

  for (var i = 0; i < currentPlants.length; i++) {
    const searchPlant = currentPlants[i];
    for (var j = 0; j < currentPlantArray.length; j++) {
      const plantObj = currentPlantArray[j];
      if (plantObj.type === searchPlant) {
        // remove the plant
        currentPlantArray.splice(j, 1);
        // update the count for the background
        if (plantObj.plantAreaIndex !== -1) {
          currentBackground.plantAreas[plantObj.plantAreaIndex]
            .occupationCount--;
        }
        break;
      }
    }
  }

  // get list of all valid plant areas
  let validPlantIndices = [];
  for (var i = 0; i < currentBackground.plantAreas.length; i++) {
    const curr = currentBackground.plantAreas[i];
    // TODO - we could make this better by putting each new plant into a
    // separate area
    if (curr.occupationCount + newPlants.length <= curr.occupationLimit) {
      validPlantIndices.push(i);
    }
  }

  // if everythings full, we're just going to add to a random one
  if (validPlantIndices.length === 0) {
    validPlantIndices = [...Array(currentBackground.plantAreas).keys()];
  }

  // choose a random index of the valid indices
  const randomInd = MathUtils.randomIntInRange(0, validPlantIndices.length);
  const selectedInd = validPlantIndices[randomInd];
  const plantArea = currentBackground.plantAreas[selectedInd];

  // construct a random distribution in the area
  const plantCoordinates = MathUtils.randomDistribution(
    plantArea.plantAreaWidth,
    plantArea.plantAreaHeight,
    newPlants
  );

  // at this point, currentPlantArray has the current state, and we
  // need to just add the new plants in newPlants
  let ind: string;
  for (ind in newPlants) {
    const plant = newPlants[ind];

    const currentCoordinates = plantCoordinates.pop() ?? [0, 0];
    const plantMapped: plantType = plantStringMap.get(plant) ?? "fern";
    const xcoord = plantArea.plantAreaTopLeftX + currentCoordinates[0];
    const ycoord = plantArea.plantAreaTopLeftY + currentCoordinates[1];

    currentPlantArray.push({
      type: plantMapped,
      xcoord: xcoord,
      ycoord: ycoord,
      source: plantFiles[plantMapped].source,
      location: plantFiles[plantMapped].location as plantLocation,
      plantAreaIndex: selectedInd,
      scale: plantArea.scale ?? 1,
      id: `${plantMapped}_${xcoord}_${ycoord}`
    });
    currentBackground.plantAreas[selectedInd].occupationCount++;
  }

  await context.globalState.update("plantArray", currentPlantArray);
  await updateBackground(context, currentBackground);
};

const updateWaterLevel = async (
  context: vscode.ExtensionContext,
  waterLevel: number
) => {
  await context.globalState.update("waterLevel", waterLevel);
};

const updateNotifyId = async (
  context: vscode.ExtensionContext,
  id: NodeJS.Timer
) => {
  await context.globalState.update("notifyId", id);
};

const updateBackground = async (
  context: vscode.ExtensionContext,
  background: Background
) => {
  await context.globalState.update("background", background);
};

const updateIsModalActive = async (
  context: vscode.ExtensionContext,
  isModalActive: boolean
) => {
  await context.globalState.update("isModalActive", isModalActive);
};

const updateIsProgramSettingsUpdate = async (
  context: vscode.ExtensionContext,
  isProgramSettingsUpdate: boolean
) => {
  await context.globalState.update(
    "isProgramSettingsUpdate",
    isProgramSettingsUpdate
  );
};

const resetBackgroundState = async (context: vscode.ExtensionContext) => {
  const background = getBackground(context);
  const resetBackground: Background = {
    ...background,
    plantAreas: background.plantAreas.map((plantArea) => {
      return {
        ...plantArea,
        occupationCount: 0
      };
    })
  };
  await updateBackground(context, resetBackground);
};

export const StateManager = {
  getPlants,
  getWaterLevel,
  getNotifyId,
  getBackground,
  getPlantArray,
  getIsModalActive,
  getIsProgramSettingsUpdate,
  updatePlants,
  updateWaterLevel,
  updateNotifyId,
  updateBackground,
  updateIsModalActive,
  updateIsProgramSettingsUpdate,
  removeSinglePlant,
  addSinglePlant
};
