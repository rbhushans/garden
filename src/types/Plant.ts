import { plantFiles } from "../constants/Plants";

export type plantLocation = "ground" | "hanging";

export interface Plant {
  type: plantType;
  source: string;
  location: plantLocation;
  xcoord: number;
  ycoord: number;
  plantAreaIndex: number;
  scale: number;
  id: string;
}

export type plantType = keyof typeof plantFiles;
