import React, {useState} from 'react';
import {View} from 'react-native';
import {Text} from '@ui-kitten/components';

import AddWorkoutPlanForm from './AddWorkoutPlanForm';
import {WorkoutPlan} from '../../models';

const WorkoutPlansViewer = () => {
  const mockPlans = [
    {
      id: 0,
      name: 'Leg Day',
      rounds: [
        {id: 0, exercise: {id: 0, name: 'Sumo Squat'}, sets: 3, repsPerSet: 12},
        {
          id: 1,
          exercise: {id: 1, name: 'Russian Deadlift'},
          sets: 3,
          repsPerSet: 12,
        },
      ],
    },
  ];

  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>(mockPlans);

  return (
    <>
      <Text category="h2">Your Workout Plans</Text>
      {workoutPlans.map(plan => (
        <View key={plan.id}>
          <Text>{plan.name}</Text>
          {plan.rounds.map(round => (
            <View key={round.id}>
              <Text>{`${round.exercise.name} ${round.sets}x${round.repsPerSet}`}</Text>
            </View>
          ))}
        </View>
      ))}
      <AddWorkoutPlanForm
        workoutPlans={workoutPlans}
        setWorkoutPlans={setWorkoutPlans}
      />
    </>
  );
};

export default WorkoutPlansViewer;
