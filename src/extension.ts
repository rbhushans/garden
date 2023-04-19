import * as vscode from "vscode";
import { Edit } from "./commands/Edit";
import { StateManager } from "./managers/StateManager";
import { SettingsManager } from "./managers/SettingsManager";
import { GardenViewProvider } from "./webview/GardenViewProvider";
import { Notify } from "./commands/Notify";
import { Water } from "./commands/Water";
import { Refresh } from "./commands/Refresh";

export function activate(context: vscode.ExtensionContext) {
  // register provider for webview
  const provider = new GardenViewProvider(context.extensionUri, context);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      GardenViewProvider.viewType,
      provider
    )
  );

  //todo: need to get this working asynchronously and not blocking everything, maybe need to run at end of activate not sure
  // if (SettingsManager.getShouldNotify()) {
  //   Notify.sendWaterNotification(context);
  // }

  // command for watering plants
  let waterCommand = vscode.commands.registerCommand("garden.water", () => {
    Water.waterPlants(context);
    provider.waterPlants();
    vscode.window.showInformationMessage("The garden has been watered!");
  });

  // command for refreshing plants
  let refreshCommand = vscode.commands.registerCommand("garden.refresh", () => {
    SettingsManager.updateWaterAmount(50);
    Refresh.setRandomPlants(context);
    provider.updatePlants();
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
  vscode.workspace.onDidChangeConfiguration((event) => {
    let plantsAffected = event.affectsConfiguration("garden.plants");
    let shouldNotifyAffected = event.affectsConfiguration(
      "garden.shouldNotify"
    );
    let notificationTime = event.affectsConfiguration(
      "garden.waterNotificationTime"
    );

    if (plantsAffected) {
      const currentPlants: string[] = SettingsManager.getPlants();
      StateManager.updatePlants(context, currentPlants);
      provider.updatePlants();
    }

    if (shouldNotifyAffected) {
      const currentShouldNotify: boolean = SettingsManager.getShouldNotify();
      if (currentShouldNotify) {
        StateManager.updateNotifyId(
          context,
          Notify.sendWaterNotification(context)
        );
      } else {
        clearInterval(StateManager.getNotifyId(context));
      }
    }

    if (notificationTime) {
      clearInterval(StateManager.getNotifyId(context));
      const currentShouldNotify: boolean = SettingsManager.getShouldNotify();
      if (currentShouldNotify) {
        StateManager.updateNotifyId(
          context,
          Notify.sendWaterNotification(context)
        );
      }
    }
  });

  // const plants = SettingsManager.getPlants();
  // console.log("UPDATING PLANTS WITH", plants);
  // StateManager.updatePlants(context, plants);
  // provider.updatePlants(plants);

  // if (SettingsManager.getShouldNotify()) {
  //   StateManager.updateNotifyId(context, Notify.sendWaterNotification(context));
  // }
}

export function deactivate() {}
