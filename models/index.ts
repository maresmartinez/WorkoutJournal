export type TargetArea = {
  id: number;
  name: string;
};

export type Exercise = {
  id: number;
  name: string;
  targetArea?: TargetArea;
};

export type WorkoutRound = {
  id: number;
  exercise: Exercise;
  sets: number;
  repsPerSet: number;
};

export type WorkoutPlan = {
  id: number;
  name: string;
  rounds: WorkoutRound[];
  targetArea?: TargetArea;
  notes?: string;
};
