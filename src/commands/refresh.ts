// This file houses all logic for refreshing the garden
import * as vscode from "vscode";
import { plantTypes } from "../constants/Plants";
import { StateManager } from "../managers/StateManager";
import { MathUtils } from "../utils/MathUtils";
import { SettingsManager } from "../managers/SettingsManager";
import { Notify } from "./Notify";
import { GardenViewProvider } from "../webview/GardenViewProvider";

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

const resetNotifications = async (
  provider: GardenViewProvider,
  context: vscode.ExtensionContext
): Promise<NodeJS.Timer | undefined> => {
  // reset modal active value
  await StateManager.updateIsModalActive(context, false);
  const isNotificationsEnabled = SettingsManager.getShouldNotify();
  // create a new water notification
  if (isNotificationsEnabled) {
    return Notify.sendWaterNotification(provider, context);
  }
  return undefined;
};

export const Refresh = {
  setRandomPlants,
  resetNotifications
};
