// This file houses the state manager used to read/write to global state
import * as vscode from "vscode";
import { DefaultState } from "../constants/State";

const getPlants = (context: vscode.ExtensionContext): string[] => {
  return context.globalState.get("plants") ?? [];
};

const getWaterLevel = (context: vscode.ExtensionContext): number => {
  return (
    context.globalState.get("waterLevel") ?? DefaultState.WATER_LEVEL_DEFAULT
  );
};

const updatePlants = async (
  context: vscode.ExtensionContext,
  plants: string[]
) => {
  await context.globalState.update("plants", plants);
};

const updateWaterLevel = async (
  context: vscode.ExtensionContext,
  waterLevel: number
) => {
  await context.globalState.update("waterLevel", waterLevel);
};

export const StateManager = {
  getPlants,
  getWaterLevel,
  updatePlants,
  updateWaterLevel
};
