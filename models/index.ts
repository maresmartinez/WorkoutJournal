export type TargetArea = {
  id: number;
  name: string;
};

export type Exercise = {
  id: number;
  name: string;
  targetArea?: TargetArea;
};
