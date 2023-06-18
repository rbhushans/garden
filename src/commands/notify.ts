// This file houses all logic for notifications to the user
import * as vscode from "vscode";
import { SettingsManager } from "../managers/SettingsManager";
import { Water } from "./Water";
import { GardenViewProvider } from "../webview/GardenViewProvider";

const sendNotification = (message: string, buttons?: string[]) => {
  return vscode.window.showInformationMessage(message, ...(buttons ?? []));
};

//todo - not working
const sendWaterNotification = (
  provider: GardenViewProvider,
  context: vscode.ExtensionContext
): NodeJS.Timer => {
  const waterNotificationTime = SettingsManager.getWaterNotificationTime();

  var intervalId = setInterval(function () {
    sendNotification("Reminder to water your plants!", ["Water"]).then(
      (value: string | undefined) => {
        if (value === "Water") {
          Water.waterPlants(context);
          provider.updateWater(true);
        }
      }
    );
  }, waterNotificationTime * 60 * 1000);

  return intervalId;
};

export const Notify = {
  sendNotification,
  sendWaterNotification
};
