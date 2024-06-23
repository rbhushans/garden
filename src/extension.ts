import * as vscode from "vscode";
import { Edit } from "./commands/Edit";
import { StateManager } from "./managers/StateManager";
import { SettingsManager } from "./managers/SettingsManager";
import { GardenViewProvider } from "./webview/GardenViewProvider";
import { Notify } from "./commands/Notify";
import { Water } from "./commands/Water";
import { Refresh } from "./commands/Refresh";
import { Timers } from "./types/Timers";

let timerIds: Timers = {
  notifyId: undefined,
  waterId: undefined
};

export function activate(context: vscode.ExtensionContext) {
  // register provider for webview
  const provider = new GardenViewProvider(context.extensionUri, context);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      GardenViewProvider.viewType,
      provider
    )
  );

  if (!StateManager.getPlantArray(context)) {
    const plants = SettingsManager.getPlants();
    StateManager.updatePlants(context, plants);
  }

  // command for watering plants
  let waterCommand = vscode.commands.registerCommand("garden.water", () => {
    Water.waterPlants(context);
    provider.updateWater(true);
    vscode.window.showInformationMessage("The garden has been watered!");
  });

  // command for refreshing plants
  let refreshCommand = vscode.commands.registerCommand("garden.refresh", () => {
    Refresh.setRandomPlants(context);
    vscode.window.showInformationMessage("The garden has been refreshed!");
  });

  // command for opening settings UI
  let editCommand = vscode.commands.registerCommand("garden.edit", () => {
    Edit.openSettings();
  });

  context.subscriptions.push(waterCommand);
  context.subscriptions.push(refreshCommand);
  context.subscriptions.push(editCommand);

  // listen for changes to plants
  vscode.workspace.onDidChangeConfiguration(async (event) => {
    let plantsAffected = event.affectsConfiguration("garden.plants");
    let shouldNotifyAffected = event.affectsConfiguration(
      "garden.shouldNotify"
    );
    let notificationTimeAffected = event.affectsConfiguration(
      "garden.waterNotificationTime"
    );
    let backgroundAffected = event.affectsConfiguration("garden.background");

    if (plantsAffected) {
      const currentPlants: string[] = SettingsManager.getPlants();
      await StateManager.updatePlants(context, currentPlants);
      provider.updatePlants(true);
    }

    if (shouldNotifyAffected) {
      if (timerIds.notifyId) {
        clearInterval(timerIds.notifyId);
      }

      const currentShouldNotify: boolean = SettingsManager.getShouldNotify();
      if (currentShouldNotify) {
        timerIds.notifyId = Notify.sendWaterNotification(provider, context);
      }
    }

    if (notificationTimeAffected) {
      if (timerIds.notifyId) {
        clearInterval(timerIds.notifyId);
      }
      timerIds.notifyId = Notify.sendWaterNotification(provider, context);

      if (timerIds.waterId) {
        clearInterval(timerIds.waterId);
      }
      timerIds.waterId = Water.decreaseWaterLevel(provider, context);
    }

    // When we swap a background, we refresh the plants
    if (backgroundAffected) {
      await StateManager.updateBackground(
        context,
        SettingsManager.getBackground()
      );
      StateManager.updatePlants(context, []);
      provider.updateBackground();
      Refresh.setRandomPlants(context);
    }
  });

  if (SettingsManager.getShouldNotify()) {
    // StateManager.updateNotifyId(context, Notify.sendWaterNotification(context));
    timerIds.notifyId = Notify.sendWaterNotification(provider, context);
  }
  timerIds.waterId = Water.decreaseWaterLevel(provider, context);
}

export function deactivate() {
  if (timerIds.notifyId) {
    clearInterval(timerIds.notifyId);
  }

  if (timerIds.waterId) {
    clearInterval(timerIds.waterId);
  }
}
