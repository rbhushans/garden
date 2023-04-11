// This file houses the HTML for the garden webview
import * as vscode from "vscode";

const getWebView = (
  nonce: string,
  extensionUri: vscode.Uri,
  webview: vscode.Webview
) => {
  const scriptUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, "src", "webview", "main.js")
  );
  const styleMainUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, "src", "webview", "styles", "main.css")
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
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="${styleMainUri}" rel="stylesheet">
        <title>Garden</title>
    </head>
    <body>
        <div class="main-div">
            hello!!!
        </div>
        <div id="water-level">

        </div>
        <ul id="plant-list">
          <li> test item </li>
				</ul>
        <script nonce="${nonce}" src="${scriptUri}"></script>
    </body>
    </html>`;
};

export const Panel = {
  getWebView
};
