import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import {Exercise} from '../../models';
import {getDBConnection, exerciseTable} from '../../db';
import Section from '../../components/Section';

const AddExerciseForm = () => {
  const emptyExercise = {id: 0, name: ''};
  const [newExercise, setNewExercise] = useState<Exercise>(emptyExercise);

  const addExercise = async () => {
    if (!newExercise.name.trim()) {
      return;
    }
    try {
      const db = await getDBConnection();
      await exerciseTable.saveItem(db, newExercise);
      setNewExercise(emptyExercise);
      await exerciseTable.getAllItems(db);
    } catch (error) {
      console.error(error);
    }
  };

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
