// This file houses the logic for getting and setting values in the configuration
import * as vscode from "vscode";
import { DefaultSettings } from "../constants/Settings";
import { Background, backgroundType } from "../types/Background";
import { backgrounds } from "../constants/Backgrounds";

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

const getBackground = (): Background => {
  const backgroundString = vscode.workspace
    .getConfiguration("garden")
    .get("background");
  return backgrounds[backgroundString as backgroundType];
};

const updatePlants = (plants: string[]) => {
  vscode.workspace
    .getConfiguration("garden")
    .update("plants", plants, vscode.ConfigurationTarget.Global);
};

const updateShouldNotify = (shouldNotify: boolean) => {
  vscode.workspace
    .getConfiguration("garden")
    .update("shouldNotify", shouldNotify, vscode.ConfigurationTarget.Global);
};

const updateWaterNotificationTime = (waterNotificationTime: number) => {
  vscode.workspace
    .getConfiguration("garden")
    .update(
      "waterNotificationTime",
      waterNotificationTime,
      vscode.ConfigurationTarget.Global
    );
};

const updateWaterAmount = (waterAmount: number) => {
  vscode.workspace
    .getConfiguration("garden")
    .update("waterAmount", waterAmount, vscode.ConfigurationTarget.Global);
};

const updateBackground = (background: string) => {
  vscode.workspace
    .getConfiguration("background")
    .update("waterAmount", background, vscode.ConfigurationTarget.Global);
};

export const SettingsManager = {
  getPlants,
  getShouldNotify,
  getWaterNotificationTime,
  getWaterAmount,
  getBackground,
  updatePlants,
  updateShouldNotify,
  updateWaterNotificationTime,
  updateWaterAmount,
  updateBackground
};
