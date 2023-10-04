import React from 'react';
import {View} from 'react-native';
import {Text} from '@ui-kitten/components';

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
