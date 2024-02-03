import { Background } from "../types/Background";
import { backgrounds } from "./Backgrounds";

const WATER_LEVEL_DEFAULT = 100;

const BACKGROUND_DEFAULT: Background = backgrounds["outside"];

export const DefaultState = {
  WATER_LEVEL_DEFAULT,
  BACKGROUND_DEFAULT
};
