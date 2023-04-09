interface Background {
  width: number;
  height: number;
  plantAreaTopLeft: number;
  plantAreaWidth: number;
  plantAreaHeight: number;
  source: string;
}

export const backgrounds: Background[] = [
  {
    width: 100,
    height: 100,
    plantAreaTopLeft: 0,
    plantAreaWidth: 100,
    plantAreaHeight: 100,
    source: "../assets/background"
  }
];
