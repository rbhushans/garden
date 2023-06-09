import { Background } from "../types/Background";

export const backgroundTypes = ["outside"];

export const backgrounds: { [key: string]: Background } = {
  outside: {
    width: 250,
    height: 150,
    plantAreaTopLeftX: 0,
    plantAreaTopLeftY: 0,
    plantAreaWidth: 100,
    plantAreaHeight: 100,
    source: "outside.jpeg"
  }
};
