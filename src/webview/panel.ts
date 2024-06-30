// This file houses the HTML for the garden webview
import * as vscode from "vscode";
import { SettingsManager } from "../managers/SettingsManager";

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
        <style>
          body {
            background-image: url('${backgroundImageUri}');
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-size: cover;
          }
        </style>
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
            Loading... 
          </div>
        </div>

        <div id="loading-div">
          <img src="${loadingUri}">
        </div>

        <div id="plant-modal">
          <div id="modal-content">
            <button id="close-modal">&times;</button>
            <div id="modal-list">
              <button class="plant-option">pothos</button>
              <button class="plant-option">monstera</button>
              <button class="plant-option">ivy</button>
              <button class="plant-option">fern</button>
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
