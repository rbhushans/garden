// This file houses all logic for watering the plants
import * as vscode from "vscode";
import { SettingsManager } from "../managers/SettingsManager";
import { StateManager } from "../managers/StateManager";

const waterPlants = (context: vscode.ExtensionContext) => {
  const waterAmount = SettingsManager.getWaterAmount();
  const currentWaterLevel = StateManager.getWaterLevel(context);
  const newWaterLevel = Math.min(100, currentWaterLevel + waterAmount);
  StateManager.updateWaterLevel(context, newWaterLevel);
};

export const Water = {
  waterPlants
};
