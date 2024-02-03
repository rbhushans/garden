import { Background } from "../types/Background";

export const backgroundTypes = ["outside"];

export const backgrounds: { [key: string]: Background } = {
  outside: {
    width: 250,
    height: 150,
    plantAreaTopLeftX: 10,
    plantAreaTopLeftY: 10,
    plantAreaWidth: 70,
    plantAreaHeight: 70,
    source: "outside.jpeg"
  }
};
