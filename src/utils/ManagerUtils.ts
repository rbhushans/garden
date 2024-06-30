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

export const ManagerUtils = {
  safeArrayAccess,
  getPlantsDiff
};
