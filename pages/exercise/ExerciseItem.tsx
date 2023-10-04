import React from 'react';
import {View, Text} from 'react-native';
import {Exercise} from '../../models';

type ExerciseItemProps = {
  exercise: Exercise;
};

const ExerciseItem = ({exercise}: ExerciseItemProps) => {
  return (
    <View>
      <Text>{exercise.name}</Text>
    </View>
  );
};

export default ExerciseItem;
