import * as vscode from "vscode";
import { PanelUtils } from "../utils/PanelUtils";
import { Panel } from "./panel";
import { StateManager } from "../managers/StateManager";
import { Webview } from "../commands/Webview";

export class GardenViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "garden.gardenView";

  private _view?: vscode.WebviewView;
  private extensionContext: vscode.ExtensionContext;

  constructor(
    private readonly _extensionUri: vscode.Uri,
    extensionContext: vscode.ExtensionContext
  ) {
    this.extensionContext = extensionContext;
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri]
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.onDidChangeVisibility(() => {
      if (webviewView.visible) {
        this.updateWater(false);
        this.updatePlants(false);
        this.updateBackground(false);
      }
    });

    // todo - need to see if way to avoid this hack
    setTimeout(() => {
      this.updatePlants(true);
      this.updateBackground(false);
    }, 3000);

    webviewView.webview.onDidReceiveMessage(
      (message) => {
        switch (message.type) {
          case "removePlant":
            Webview.removePlant(this.extensionContext, message.value);
            return;
          case "addPlant":
            Webview.addPlant(
              this.extensionContext,
              message.value.type,
              message.value.xcoord,
              message.value.ycoord
            );
            return;
          case "debug":
            console.log("[DEBUG]", JSON.stringify(message));
            return;
        }
      },
      undefined,
      this.extensionContext.subscriptions
    );
  }

  public updateWater(shouldShow: boolean) {
    if (this._view) {
      // this function will set the water bar correctly by retrieving the state
      const waterLevel = StateManager.getWaterLevel(this.extensionContext);
      if (shouldShow) {
        this._view.show?.(true);
      }

      // now update the UI
      this._view.webview.postMessage({
        type: "updateWater",
        value: waterLevel
      });
    }
  }

  public updateBackground(shouldClearPlants = true) {
    if (this._view) {
      const background = StateManager.getBackground(this.extensionContext);
      const uri = this._view.webview
        .asWebviewUri(
          vscode.Uri.joinPath(
            this._extensionUri,
            "assets",
            "themes",
            background.theme,
            background.source
          )
        )
        .toString();

      // now update the UI
      this._view.webview.postMessage({
        type: "updateBackground",
        value: {
          uri: uri,
          backgroundColor: background.backgroundColor,
          shouldClearPlants: shouldClearPlants
        }
      });
    }
  }

  public updatePlants(shouldShow: boolean) {
    if (this._view) {
      // this function will update the plants in the view
      const plants = StateManager.getPlantArray(this.extensionContext);
      const theme = StateManager.getBackground(this.extensionContext).theme;

      const plantsWithSourceUri = [];
      for (var i = 0; i < plants.length; i++) {
        const plant = plants[i];
        plantsWithSourceUri.push({
          type: plant.type,
          xcoord: plant.xcoord,
          ycoord: plant.ycoord,
          source: this._view.webview
            .asWebviewUri(
              vscode.Uri.joinPath(
                this._extensionUri,
                "assets",
                "themes",
                theme,
                plant.source
              )
            )
            .toString(),
          location: plant.location,
          scale: plant.scale,
          id: plant.id
        });
      }

      plantsWithSourceUri.sort((a, b) => a.scale - b.scale);

      if (shouldShow) {
        this._view.show?.(true);
      }

      // now update the UI
      this._view.webview.postMessage({
        type: "updatePlants",
        value: plantsWithSourceUri
      });
    }
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    // Use a nonce to only allow a specific script to be run.
    const nonce = PanelUtils.getNonce();

    return Panel.getWebView(nonce, this._extensionUri, webview);
  }
}
