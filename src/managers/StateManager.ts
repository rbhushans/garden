// This file houses the state manager used to read/write to global state
import * as vscode from "vscode";
import { DefaultState } from "../constants/State";
import { plantFiles, plantStringMap } from "../constants/Plants";
import { MathUtils } from "../utils/MathUtils";
import { Background } from "../types/Background";
import { Plant, plantLocation, plantType } from "../types/Plant";

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

const updatePlants = async (
  context: vscode.ExtensionContext,
  plants: string[]
) => {
  await context.globalState.update("plants", plants);
  const currentBackground = getBackground(context);
  const plantCoordinates = MathUtils.randomDistribution(
    currentBackground.plantAreaWidth,
    currentBackground.plantAreaHeight,
    plants.length
  );

  // array of plants and locations
  let plantArray: Plant[] = [];

  let ind: string;
  for (ind in plants) {
    const plant = plants[ind];
    const currentCoordinates = plantCoordinates.pop() ?? [0, 0];
    const plantMapped: plantType = plantStringMap.get(plant) ?? "fern";

    plantArray.push({
      type: plantMapped,
      xcoord: currentCoordinates[0] + currentBackground.plantAreaTopLeftX,
      ycoord: currentCoordinates[1] + currentBackground.plantAreaTopLeftY,
      source: plantFiles[plantMapped].source,
      location: plantFiles[plantMapped].location as plantLocation
    });
  }

  await context.globalState.update("plantArray", plantArray);
};

const updateWaterLevel = async (
  context: vscode.ExtensionContext,
  waterLevel: number
) => {
  console.log("updating water level");
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

export const StateManager = {
  getPlants,
  getWaterLevel,
  getNotifyId,
  getBackground,
  getPlantArray,
  updatePlants,
  updateWaterLevel,
  updateNotifyId,
  updateBackground
};
