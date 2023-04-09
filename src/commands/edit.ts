// This file houses all logic related to allowing the user to edit their garden
import * as vscode from "vscode";

const openSettings = () => {
  vscode.commands.executeCommand("workbench.action.openSettings", "garden");
};

export const Edit = {
  openSettings
};
