// This file houses all logic for notifications to the user
import * as vscode from "vscode";
import { SettingsManager } from "../managers/SettingsManager";
import { Water } from "./Water";
import { GardenViewProvider } from "../webview/GardenViewProvider";
import { StateManager } from "../managers/StateManager";

const ACTIVE_MODAL = "ACTIVE_MODAL";

const sendNotification = async (
  message: string,
  context: vscode.ExtensionContext,
  buttons?: string[]
) => {
  const isModalCurrentlyActive = StateManager.getIsModalActive(context);
  const isModal = SettingsManager.getIsModal();

  if (isModalCurrentlyActive && isModal) {
    return new Promise(
      (resolve: (value: string | undefined) => void, _reject) =>
        resolve(ACTIVE_MODAL)
    );
  }

  if (isModal) {
    await StateManager.updateIsModalActive(context, true);
  }

  return vscode.window.showInformationMessage(
    message,
    { modal: isModal },
    ...(buttons ?? [])
  );
};

const sendWaterNotification = (
  provider: GardenViewProvider,
  context: vscode.ExtensionContext
): NodeJS.Timer => {
  const waterNotificationTime = SettingsManager.getWaterNotificationTime();

  var intervalId = setInterval(function () {
    sendNotification("Reminder to water your plants!", context, [
      "Water"
    ])?.then((value: string | undefined) => {
      if (value === ACTIVE_MODAL) {
        return;
      }
      if (value === "Water") {
        Water.waterPlants(context);
        provider.updateWater(true);
      }
      StateManager.updateIsModalActive(context, false);
    });
  }, waterNotificationTime * 60 * 1000);

  return intervalId;
};

export const Notify = {
  sendNotification,
  sendWaterNotification
};
