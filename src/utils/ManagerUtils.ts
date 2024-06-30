import { PlantArea } from "../types/Background";

const safeArrayAccess = (ind: number, arr: any[]) => {
  if (ind < 0 || ind >= arr.length) {
    return null;
  }
  return arr[ind];
};

// gets plants that are in arr1 that are not in arr2
const getPlantsDiff = (arr1: string[], arr2: string[]) => {
  for (var i = 0; i < arr2.length; i++) {
    const plant = arr2[i];
    const index = arr1.indexOf(plant);
    if (index !== -1) {
      arr1.splice(index, 1);
    }
  }
  return arr1;
};

const isCoordInBounds = (xcoord: number, ycoord: number, area: PlantArea) => {
  return (
    xcoord > area.plantAreaTopLeftX &&
    xcoord < area.plantAreaTopLeftX + area.plantAreaWidth &&
    ycoord > area.plantAreaTopLeftY &&
    ycoord < area.plantAreaTopLeftY + area.plantAreaHeight
  );
};

export const ManagerUtils = {
  safeArrayAccess,
  getPlantsDiff,
  isCoordInBounds
};
