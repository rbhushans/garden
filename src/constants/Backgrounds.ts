import { Background } from "../types/Background";

export const backgroundTypes = ["outside"];

export const backgrounds: { [key: string]: Background } = {
  outside: {
    width: 100,
    height: 100,
    plantAreaTopLeftX: 0,
    plantAreaTopLeftY: 0,
    plantAreaWidth: 100,
    plantAreaHeight: 100,
    source: "../assets/backgrounds/outside.jpeg"
  }
};
