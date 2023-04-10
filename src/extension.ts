import * as vscode from "vscode";
import { Edit } from "./commands/Edit";
import { StateManager } from "./managers/StateManager";
import { SettingsManager } from "./managers/SettingsManager";
import { GardenViewProvider } from "./webview/GardenViewProvider";
import { Notify } from "./commands/Notify";

export function activate(context: vscode.ExtensionContext) {
  const provider = new GardenViewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      GardenViewProvider.viewType,
      provider
    )
  );

  // command for watering plants
  let waterCommand = vscode.commands.registerCommand("garden.water", () => {
    vscode.window.showInformationMessage("The garden has been watered!");
  });

  // command for refreshing plants
  let refreshCommand = vscode.commands.registerCommand("garden.refresh", () => {
    SettingsManager.getPlants();
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

    if (plantsAffected) {
      const currentPlants: string[] = SettingsManager.getPlants();
      StateManager.updatePlants(context, currentPlants);
      // todo: update the UI of the garden for new/removed plants
    }

    if (shouldNotifyAffected) {
      const currentShouldNotify: boolean = SettingsManager.getShouldNotify();
      Notify.sendWaterNotification(context);
    }
  });
}

export function deactivate() {}
