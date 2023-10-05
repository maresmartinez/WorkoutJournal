export const initialExercises = [
  {id: 1, name: 'Goblet Squat'},
  {id: 2, name: 'Bicep Curl (Barbell)'},
  {id: 3, name: 'Romainian Deadlift (Dumbbell)'},
  {id: 4, name: 'Lunge (Dumbbell)'},
  {id: 5, name: 'Bench Press (Barbell)'},
  {id: 6, name: 'Bench Press (Dumbbell)'},
  {id: 7, name: 'Bent Over Row (Barbell)'},
  {id: 8, name: 'Cross Body Hammer Curl (Dumbbell)'},
  {id: 9, name: 'Deadlift (Barbell)'},
  {id: 10, name: 'Hammer Curl (Dumbbell)'},
  {id: 11, name: 'Lat Pulldown (Cable)'},
  {id: 12, name: 'Lateral Raise (Dumbbell)'},
  {id: 13, name: 'Leg Extension (Machine)'},
  {id: 14, name: 'Leg Press (Machine)'},
  {id: 15, name: 'Squat (Barbell)'},
  {id: 16, name: 'Tricep Pushdown'},
];

export const initialWorkoutPlans = [
  {
    id: 0,
    name: 'Leg Day',
    rounds: [
      {
        id: 0,
        exercise: {id: 1, name: 'Goblet Squat'},
        sets: 3,
        repsPerSet: 12,
      },
      {
        id: 1,
        exercise: {id: 1, name: 'Russian Deadlift'},
        sets: 3,
        repsPerSet: 12,
      },
    ],
  },
  {
    id: 1,
    name: 'Arm Day',
    rounds: [
      {
        id: 0,
        exercise: {id: 2, name: 'Bicep Curl (Barbell)'},
        sets: 3,
        repsPerSet: 12,
      },
      {
        id: 1,
        exercise: {id: 5, name: 'Bench Press (Barbell)'},
        sets: 3,
        repsPerSet: 12,
      },
    ],
  },
];
