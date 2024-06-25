import { plantType } from "../types/Plant";

export const plantTypes = ["monstera", "pothos", "ivy", "fern"];

export const plantFiles = {
  monstera: { source: "monstera.png", location: "ground" },
  pothos: { source: "pothos.png", location: "ground" },
  ivy: { source: "ivy.png", location: "ground" },
  fern: { source: "fern.png", location: "ground" }
};

export const plantStringMap = new Map<string, plantType>([
  ["monstera", "monstera"],
  ["pothos", "pothos"],
  ["ivy", "ivy"],
  ["fern", "fern"]
]);
