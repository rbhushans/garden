import { plants } from "../constants/Plants";

export type plantLocation = "ground" | "hanging";

export interface Plant {
  source: string;
  location: plantLocation;
}

export type plantType = keyof typeof plants;
