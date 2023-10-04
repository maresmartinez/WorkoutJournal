import React from 'react';
import {Text, Input, Button, Layout} from '@ui-kitten/components';

import {Exercise} from '../../models';
import defaultStyles from '../../styles/global';

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
      <Text style={defaultStyles.mb10} category="h4">
        Add New Exercises
      </Text>
      <Layout style={defaultStyles.mb10}>
        <Input
          label="Exercise Name"
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
