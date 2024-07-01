// This file houses the HTML for the garden webview
import * as vscode from "vscode";
import { SettingsManager } from "../managers/SettingsManager";
import { PanelUtils } from "../utils/PanelUtils";

const getWebView = (
  nonce: string,
  extensionUri: vscode.Uri,
  webview: vscode.Webview
) => {
  const scriptUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, "assets", "scripts", "main.js")
  );
  const styleMainUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, "assets", "styles", "main.css")
  );
  const background = SettingsManager.getBackground();

  const backgroundImageUri = webview.asWebviewUri(
    vscode.Uri.joinPath(
      extensionUri,
      "assets",
      "themes",
      background.theme,
      background.source
    )
  );
  const loadingUri = webview.asWebviewUri(
    vscode.Uri.joinPath(
      extensionUri,
      "assets",
      "loading",
      "plant_loading_small.gif"
    )
  );
  const pothosUri = PanelUtils.getPlantUri(
    "pothos",
    background,
    extensionUri,
    webview
  );
  const fernUri = PanelUtils.getPlantUri(
    "fern",
    background,
    extensionUri,
    webview
  );
  const monsteraUri = PanelUtils.getPlantUri(
    "monstera",
    background,
    extensionUri,
    webview
  );
  const ivyUri = PanelUtils.getPlantUri(
    "ivy",
    background,
    extensionUri,
    webview
  );

  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <!--
            Use a content security policy to only allow loading styles from our extension directory,
            and only allow scripts that have a specific nonce.
            (See the 'webview-sample' extension sample for img-src content security policy examples)
        -->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}';">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
		    <link href="${styleMainUri}" rel="stylesheet">
        <title>Garden</title>
    </head>
    <body>
      <div id="parent">
        <div id="main-div">
          <img id="background-img" src="${backgroundImageUri}">

          <div id="water-level-back"></div>

          <div id="water-level"></div>

          <div id="plant-list">
          </div>
        </div>

        <div id="loading-div">
          <img src="${loadingUri}">
        </div>

        <div id="plant-modal" style="display:none;">
          <div id="modal-content">
            
            <div id="modal-list">
              <div id="modal-header">
                Add a plant:
                <button id="close-modal">&times;</button>
              </div>
              <button class="plant-option">
                <img class="plant-option-img" src="${pothosUri}">
                pothos
              </button>
              <button class="plant-option">
                <img class="plant-option-img" src="${monsteraUri}">
                monstera
              </button>
              <button class="plant-option">
                <img class="plant-option-img" src="${ivyUri}">
                ivy
              </button>
              <button class="plant-option">
                <img class="plant-option-img" src="${fernUri}">
                fern
              </button>
            </div>
          </div>
        </div>
      </div>

        <script nonce="${nonce}" src="${scriptUri}"></script>
    </body>
    </html>`;
};

export const Panel = {
  getWebView
};
