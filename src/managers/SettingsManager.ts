// This file houses the logic for getting and setting values in the configuration
import * as vscode from "vscode";
import { DefaultSettings } from "../constants/Settings";

const getPlants = (): string[] => {
  return vscode.workspace.getConfiguration("garden").get("plants") ?? [];
};

const getShouldNotify = (): boolean => {
  return (
    vscode.workspace.getConfiguration("garden").get("shouldNotify") ??
    DefaultSettings.SHOULD_NOTIFY_DEFAULT
  );
};

const getWaterNotificationTime = (): number => {
  return (
    vscode.workspace.getConfiguration("garden").get("waterNotificationTime") ??
    DefaultSettings.WATER_NOTIFICATION_TIME_DEFAULT
  );
};

const getWaterAmount = (): number => {
  return (
    vscode.workspace.getConfiguration("garden").get("waterAmount") ??
    DefaultSettings.WATER_AMOUNT_DEFAULT
  );
};

const updatePlants = (plants: string[]) => {
  vscode.workspace.getConfiguration("garden").update("plants", plants);
};

const updateShouldNotify = (shouldNotify: boolean) => {
  vscode.workspace
    .getConfiguration("garden")
    .update("shouldNotify", shouldNotify);
};

const updateWaterNotificationTime = (waterNotificationTime: number) => {
  vscode.workspace
    .getConfiguration("garden")
    .update("waterNotificationTime", waterNotificationTime);
};

const updateWaterAmount = (waterAmount: number) => {
  vscode.workspace
    .getConfiguration("garden")
    .update("waterAmount", waterAmount);
};

export const SettingsManager = {
  getPlants,
  getShouldNotify,
  getWaterNotificationTime,
  getWaterAmount,
  updatePlants,
  updateShouldNotify,
  updateWaterNotificationTime,
  updateWaterAmount
};
