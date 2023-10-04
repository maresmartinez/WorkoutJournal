import React, {useState, useEffect, useCallback} from 'react';
import {Text} from '@ui-kitten/components';

import {Exercise} from '../../models';
import {getDBConnection, exerciseTable} from '../../db';
import {initialExercises} from '../../data/initialData';
import ExerciseItem from './ExerciseItem';
import AddExerciseForm from './AddExerciseForm';

const ExerciseList = () => {
  const emptyExercise = {id: 0, name: ''};

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [newExercise, setNewExercise] = useState<Exercise>(emptyExercise);

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      const storedExercises = await exerciseTable.getAllItems(db);
      if (storedExercises.length) {
        setExercises(storedExercises);
      } else {
        await exerciseTable.saveMany(db, initialExercises);
        setExercises(initialExercises);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  const addExercise = async () => {
    if (!newExercise.name.trim()) {
      return;
    }
    try {
      const db = await getDBConnection();
      await exerciseTable.saveItem(db, newExercise);
      setNewExercise(emptyExercise);
      const updatedExercises = await exerciseTable.getAllItems(db);
      setExercises(updatedExercises);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Text category="h2">Exercises</Text>
      {exercises.map(exercise => (
        <ExerciseItem key={exercise.id} exercise={exercise} />
      ))}
      <AddExerciseForm
        newExercise={newExercise}
        setNewExercise={setNewExercise}
        addExercise={addExercise}
      />
    </>
  );
};

export default ExerciseList;
