import React from 'react';
import {View, Text} from 'react-native';
import Section from '../../components/Section';

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

  return (
    <Section title="Your Workout Plans">
      {mockPlans.map(plan => (
        <View key={plan.id}>
          <Text>{plan.name}</Text>
          {plan.rounds.map(round => (
            <View key={round.id}>
              <Text>{`${round.exercise.name} ${round.sets}x${round.repsPerSet}`}</Text>
            </View>
          ))}
        </View>
      ))}
    </Section>
  );
};

export default WorkoutPlansViewer;
