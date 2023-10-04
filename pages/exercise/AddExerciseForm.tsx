import React from 'react';
import {View, TextInput, Button} from 'react-native';
import {Exercise} from '../../models';
import Section from '../../components/Section';

type AddExerciseFormProps = {
  newExercise: Exercise;
  setNewExercise: (exercise: Exercise) => void;
  addExercise: () => void;
};

const AddExerciseForm = ({
  addExercise,
  setNewExercise,
  newExercise,
}: AddExerciseFormProps) => {
  return (
    <Section title="Add New Exercise">
      <View>
        <TextInput
          value={newExercise.name}
          onChangeText={(text: string) =>
            setNewExercise({...newExercise, name: text})
          }
        />
      </View>
      <Button
        onPress={addExercise}
        title="Add exercise"
        accessibilityLabel="add new exercise"
      />
    </Section>
  );
};

export default AddExerciseForm;
