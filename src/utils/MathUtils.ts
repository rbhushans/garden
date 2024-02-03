// This file houses all utility functions related to math

const randomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

// min inclusive, max exclusive
const randomIntInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

// function to randomly distribute plants within area
// returns list of coordinates
const randomDistribution = (
  width: number,
  height: number,
  numPlants: number
): number[][] => {
  let coords = [];
  let gridSize = Math.floor(width / numPlants);

  for (var i = 0; i <= width - gridSize; i += gridSize) {
    const randY = randomInt(height);
    const randX = randomIntInRange(i, i + gridSize);
    coords.push([randX, randY]);
  }

  return coords;
};

export const MathUtils = {
  randomInt,
  randomIntInRange,
  randomDistribution
};
