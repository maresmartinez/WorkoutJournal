import React, {useState} from 'react';
import {Layout, Text, Divider} from '@ui-kitten/components';

import AddWorkoutPlanForm from './AddWorkoutPlanForm';
import {WorkoutPlan} from '../../models';
import defaultStyles from '../../styles/global';

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

  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>(mockPlans);

  return (
    <>
      <Layout style={defaultStyles.mb20}>
        <Text style={defaultStyles.mb10} category="h4">
          Your Workout Plans
        </Text>
        {workoutPlans.map(plan => (
          <Layout style={defaultStyles.mb10} key={plan.id}>
            <Text category="h6">{plan.name}</Text>
            {plan.rounds.map(round => (
              <Layout key={round.id}>
                <Text>{`${round.exercise.name} ${round.sets}x${round.repsPerSet}`}</Text>
              </Layout>
            ))}
          </Layout>
        ))}
      </Layout>
      <Divider style={defaultStyles.mb20} />
      <Layout style={defaultStyles.mb20}>
        <AddWorkoutPlanForm
          workoutPlans={workoutPlans}
          setWorkoutPlans={setWorkoutPlans}
        />
      </Layout>
    </>
  );
};

export default WorkoutPlansViewer;
