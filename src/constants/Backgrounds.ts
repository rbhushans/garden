import { Background } from "../types/Background";

export const backgroundTypes = ["outside"];

export const backgrounds: { [key: string]: Background } = {
  outside: {
    theme: "outside",
    width: 250,
    height: 150,
    plantAreas: [
      {
        plantAreaTopLeftX: 0,
        plantAreaTopLeftY: 45,
        plantAreaWidth: 75,
        plantAreaHeight: 20,
        occupationCount: 0,
        occupationLimit: 20
      }
    ],
    source: "outside.png"
  },
  backyard: {
    theme: "backyard",
    width: 250,
    height: 150,
    plantAreas: [
      {
        plantAreaTopLeftX: 0,
        plantAreaTopLeftY: 30,
        plantAreaWidth: 75,
        plantAreaHeight: 35,
        occupationCount: 0,
        occupationLimit: 20
      }
    ],
    source: "backyard.png"
  }
};
