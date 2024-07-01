// This file contains the utility files for rendering the webview panel
import * as vscode from "vscode";
import { Background } from "../types/Background";
import { plantType } from "../types/Plant";

const getNonce = () => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const getPlantUri = (
  type: plantType,
  background: Background,
  extensionUri: vscode.Uri,
  webview: vscode.Webview
) => {
  return webview.asWebviewUri(
    vscode.Uri.joinPath(
      extensionUri,
      "assets",
      "themes",
      background.theme,
      `${type}.png`
    )
  );
};

export const PanelUtils = {
  getNonce,
  getPlantUri
};
