// This file houses all utility functions related to math

const randomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

// function to randomly distribute plants within area
// returns list of coordinates
const randomDistribution = (
  width: number,
  height: number,
  numPlants: number
): number[][] => {
  return [
    [0, 0],
    [10, 10],
    [20, 20],
    [30, 30],
    [40, 40]
  ];
};

export const MathUtils = {
  randomInt,
  randomDistribution
};
