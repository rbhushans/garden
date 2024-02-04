// This file houses all utility functions related to math

import { plantFiles, plantStringMap } from "../constants/Plants";
import { Plant, plantType } from "../types/Plant";

const randomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

// min inclusive, max exclusive
const randomIntInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

// function to randomly distribute plants within area
// takes into account whether ground or hanging plant
// returns list of coordinates
const randomDistribution = (
  width: number,
  height: number,
  plants: string[]
): number[][] => {
  const numPlants = plants.length;
  let coords = [];
  let ind = 0;
  let gridSize = Math.floor(width / numPlants);

  for (var i = 0; i <= width - gridSize; i += gridSize) {
    const plant = plants[ind];
    const plantMapped = plantFiles[plantStringMap.get(plant) ?? "fern"];
    const isGroundPlant = plantMapped.location === "ground";
    const randY = isGroundPlant
      ? randomIntInRange(height / 2, height)
      : randomIntInRange(0, height / 2);
    const randX = randomIntInRange(i, i + gridSize);
    coords.push([randX, randY]);
    ind++;
  }

  return coords;
};

export const MathUtils = {
  randomInt,
  randomIntInRange,
  randomDistribution
};
