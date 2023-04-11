// This file houses the state manager used to read/write to global state
import * as vscode from "vscode";
import { DefaultState } from "../constants/State";
import { plantTypes } from "../constants/Plants";
import { MathUtils } from "../utils/MathUtils";
import { plantType } from "../types/Plant";

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
  let plant: string;
  for (plant in plantTypes) {
    const currentPlantState = context.globalState.get(plant);
    if (currentPlantState === undefined && plant in plants) {
      // new plant!
      context.globalState.update(plant, {
        xcoord: MathUtils.randomInt(100), // todo: use background state for this
        ycoord: MathUtils.randomInt(100),
        source: plants[plant]
      });
    } else if (currentPlantState !== undefined && !(plant in plants)) {
      // remove plant!
      context.globalState.update(plant, undefined);
    }
  }
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
