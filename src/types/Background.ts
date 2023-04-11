import { backgrounds } from "../constants/Backgrounds";

export interface Background {
  width: number;
  height: number;
  plantAreaTopLeft: number;
  plantAreaWidth: number;
  plantAreaHeight: number;
  source: string;
}

export type backgroundType = keyof typeof backgrounds;
