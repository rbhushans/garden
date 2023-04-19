import { plantType } from "../types/Plant";

export const plantTypes = ["monstera", "pothos", "ivy", "fern"];

export const plantFiles = {
  monstera: { source: "star.png", location: "ground" },
  pothos: { source: "star.png", location: "hanging" },
  ivy: { source: "star.png", location: "ground" },
  fern: { source: "star.png", location: "ground" }
};

export const plantStringMap = new Map<string, plantType>([
  ["monstera", "monstera"],
  ["pothos", "pothos"],
  ["ivy", "ivy"],
  ["fern", "fern"]
]);
