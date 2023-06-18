import { plantFiles } from "../constants/Plants";

export type plantLocation = "ground" | "hanging";

export interface Plant {
  type: plantType;
  source: string;
  location: plantLocation;
  xcoord: number;
  ycoord: number;
}

export type plantType = keyof typeof plantFiles;
