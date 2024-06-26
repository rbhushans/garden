// This file houses all logic for refreshing the garden
import * as vscode from "vscode";
import { plantTypes } from "../constants/Plants";
import { StateManager } from "../managers/StateManager";
import { MathUtils } from "../utils/MathUtils";
import { SettingsManager } from "../managers/SettingsManager";

const randomPlants = (): string[] => {
  const numPlants = MathUtils.randomInt(plantTypes.length) + 1;
  let plants = new Set<string>();

  while (plants.size !== numPlants) {
    plants.add(plantTypes[MathUtils.randomInt(plantTypes.length)]);
  }

  return Array.from(plants.values());
};

const setRandomPlants = async (context: vscode.ExtensionContext) => {
  const newPlants = randomPlants();
  // clear plants
  await StateManager.updateIsProgramSettingsUpdate(context, true);
  await StateManager.updatePlants(context, []);
  SettingsManager.updatePlants([]);

  // set new plants
  await StateManager.updateIsProgramSettingsUpdate(context, true);
  await StateManager.updatePlants(context, newPlants);
  SettingsManager.updatePlants(newPlants);
};

export const Refresh = {
  setRandomPlants
};
