import { Background } from "../types/Background";

const WATER_LEVEL_DEFAULT = 100;

const BACKGROUND_DEFAULT: Background = {
  width: 100,
  height: 100,
  plantAreaTopLeftX: 0,
  plantAreaTopLeftY: 0,
  plantAreaWidth: 100,
  plantAreaHeight: 100,
  source: "../assets/backgrounds/outside.jpeg"
};

export const DefaultState = {
  WATER_LEVEL_DEFAULT,
  BACKGROUND_DEFAULT
};
