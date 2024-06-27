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
        plantAreaHeight: 18,
        occupationCount: 0,
        occupationLimit: 20
      }
    ],
    source: "outside.png",
    backgroundColor: "#83E4FF"
  },
  backyard: {
    theme: "backyard",
    width: 250,
    height: 150,
    plantAreas: [
      {
        plantAreaTopLeftX: 0,
        plantAreaTopLeftY: 28,
        plantAreaWidth: 75,
        plantAreaHeight: 33,
        occupationCount: 0,
        occupationLimit: 20
      }
    ],
    source: "backyard.png",
    backgroundColor: "#BCD9FF"
  },
  balcony: {
    theme: "balcony",
    width: 250,
    height: 150,
    plantAreas: [
      {
        // shelf - disabled for now
        plantAreaTopLeftX: 57,
        plantAreaTopLeftY: 17,
        plantAreaWidth: 5,
        plantAreaHeight: 1,
        occupationCount: 0,
        occupationLimit: 0,
        scale: 0.3
      },
      {
        // bench - disabled for now
        plantAreaTopLeftX: 75,
        plantAreaTopLeftY: 50,
        plantAreaWidth: 3,
        plantAreaHeight: 1,
        occupationCount: 0,
        occupationLimit: 0,
        scale: 0.3
      },
      {
        // floor - back
        plantAreaTopLeftX: 25,
        plantAreaTopLeftY: 40,
        plantAreaWidth: 30,
        plantAreaHeight: 10,
        occupationCount: 0,
        occupationLimit: 5
      },
      {
        // floor - front
        plantAreaTopLeftX: 20,
        plantAreaTopLeftY: 50,
        plantAreaWidth: 50,
        plantAreaHeight: 10,
        occupationCount: 0,
        occupationLimit: 5
      }
    ],
    source: "balcony.png",
    backgroundColor: "#E4EEF6"
  }
};
