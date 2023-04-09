import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // register all commands

  // command for watering plants
  let waterCommand = vscode.commands.registerCommand("garden.water", () => {
    vscode.window.showInformationMessage("The garden has been watered!");
  });

  // command for refreshing plants
  let refreshCommand = vscode.commands.registerCommand("garden.refresh", () => {
    vscode.window.showInformationMessage("The garden has been refreshed!");
  });

  // command for opening settings UI
  let editCommand = vscode.commands.registerCommand("garden.edit", () => {
    vscode.window.showInformationMessage("The garden has been edited!");
  });

  context.subscriptions.push(waterCommand);
  context.subscriptions.push(refreshCommand);
  context.subscriptions.push(editCommand);
}

export function deactivate() {}
