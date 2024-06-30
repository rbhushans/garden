import { SettingsManager } from "../managers/SettingsManager";
import { StateManager } from "../managers/StateManager";
import { Plant, plantType } from "../types/Plant";
import * as vscode from "vscode";

const addPlant = (
  context: vscode.ExtensionContext,
  plant: plantType,
  xcoord: number,
  ycoord: number
): void => {
  const currentPlants = SettingsManager.getPlants();
  StateManager.updateIsProgramSettingsUpdate(context, true).then(() => {
    SettingsManager.updatePlants(currentPlants);
  });
};

const removePlant = (
  context: vscode.ExtensionContext,
  plantId: string
): void => {
  const currentPlants = StateManager.getPlantArray(context);
  const filteredPlants = currentPlants.filter((plant) => plant.id !== plantId);
  StateManager.removeSinglePlant(context, plantId);
  StateManager.updateIsProgramSettingsUpdate(context, true).then(() => {
    SettingsManager.updatePlants(filteredPlants.map((v) => v.type));
  });
};

export const Webview = {
  addPlant,
  removePlant
};
