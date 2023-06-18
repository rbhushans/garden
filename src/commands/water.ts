// This file houses all logic for watering the plants
import * as vscode from "vscode";
import { SettingsManager } from "../managers/SettingsManager";
import { StateManager } from "../managers/StateManager";
import { GardenViewProvider } from "../webview/GardenViewProvider";

const waterPlants = (context: vscode.ExtensionContext) => {
  const waterAmount = SettingsManager.getWaterAmount();
  const currentWaterLevel = StateManager.getWaterLevel(context);
  const newWaterLevel = Math.min(100, currentWaterLevel + waterAmount);
  StateManager.updateWaterLevel(context, newWaterLevel);
};

const decreaseWaterLevel = (
  provider: GardenViewProvider,
  context: vscode.ExtensionContext
) => {
  // we calculate the step size per minute based on the fact that
  // 1/4 of the water should decrease every notification period
  const notifTime = SettingsManager.getWaterNotificationTime();
  const stepSize = notifTime / 25;

  return setInterval(function () {
    const currentWaterLevel = StateManager.getWaterLevel(context);
    StateManager.updateWaterLevel(context, currentWaterLevel - 1);
    provider.updateWater(true);
  }, stepSize * 60 * 1000);
};

export const Water = {
  waterPlants,
  decreaseWaterLevel
};
