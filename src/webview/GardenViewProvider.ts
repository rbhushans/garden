import * as vscode from "vscode";
import { PanelUtils } from "../utils/PanelUtils";
import { Panel } from "./Panel";
import { StateManager } from "../managers/StateManager";

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
    console.log("RESOLVING");
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
      }
    });

    // todo - need to see if way to avoid this hack
    setTimeout(() => {
      this.updatePlants(true);
    }, 5000);
  }

  public updateWater(shouldShow: boolean) {
    if (this._view) {
      // this function will set the water bar correctly by retrieving the state
      const waterLevel = StateManager.getWaterLevel(this.extensionContext);
      console.log("WATER LEVEL", waterLevel);
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

  public updatePlants(shouldShow: boolean) {
    if (this._view) {
      // this function will update the plants in the view
      const plants = StateManager.getPlantArray(this.extensionContext);

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
                "src",
                "assets",
                "plants",
                plant.source
              )
            )
            .toString(),
          location: plant.location
        });
      }

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
