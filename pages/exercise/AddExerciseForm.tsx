import React from 'react';
import {Text, Input, Button, Layout} from '@ui-kitten/components';

import {Exercise} from '../../models';

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
    <>
      <Text category="h2">Add New Exercises</Text>
      <Layout>
        <Text category="label">Exercise Name</Text>
        <Input
          value={newExercise.name}
          onChangeText={(text: string) =>
            setNewExercise({...newExercise, name: text})
          }
        />
      </Layout>
      <Button onPress={addExercise}>Add exercise</Button>
    </>
  );
};

export default AddExerciseForm;
