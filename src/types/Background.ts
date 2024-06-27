import { backgrounds } from "../constants/Backgrounds";

export interface Background {
  theme: string;
  width: number;
  height: number;
  source: string;
  plantAreas: PlantArea[];
  backgroundColor: string;
}

// define coords and dims as a %
export interface PlantArea {
  plantAreaTopLeftX: number; //from the left of the screen
  plantAreaTopLeftY: number; // from the top of the screen
  plantAreaWidth: number;
  plantAreaHeight: number;
  occupationCount: number;
  occupationLimit: number;
  scale?: number;
}

export type backgroundType = keyof typeof backgrounds;
