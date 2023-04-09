// This file houses all logic for notifications to the user
import * as vscode from "vscode";
import { SettingsManager } from "../managers/SettingsManager";
import { Water } from "./Water";

const sendNotification = (message: string, buttons?: string[]) => {
  return vscode.window.showInformationMessage(message, ...(buttons ?? []));
};

const sendWaterNotification = async (context: vscode.ExtensionContext) => {
  while (true) {
    const waterNotificationTime = SettingsManager.getWaterNotificationTime();
    setTimeout(() => {
      const shouldNotify = SettingsManager.getShouldNotify();
      if (shouldNotify) {
        sendNotification("Reminder to water your plants!", ["Water"]).then(
          (value: string | undefined) => {
            console.log(value);

            if (value === "Water") {
              Water.waterPlants(context);
            }
          }
        );
      }
    }, waterNotificationTime * 60 * 60 * 1000);
  }
};

export const Notify = {
  sendNotification,
  sendWaterNotification
};
