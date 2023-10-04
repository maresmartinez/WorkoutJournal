import React from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
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
        <Text style={styles.label}>Exercise Name</Text>
        <TextInput
          style={styles.textInputContainer}
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

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 21,
  },
  textInputContainer: {
    marginBottom: 30,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'flex-end',
  },
});

export default AddExerciseForm;
