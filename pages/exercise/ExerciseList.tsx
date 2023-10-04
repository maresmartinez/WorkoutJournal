import React, {useState, useEffect, useCallback} from 'react';
import {Exercise} from '../../models';
import {getDBConnection, exerciseTable} from '../../db';
import {initialExercises} from '../../data/initialData';
import ExerciseItem from './ExerciseItem';
import Section from '../../components/Section';

const ExerciseList = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

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

  return (
    <Section title="Exercises">
      {exercises.map(exercise => (
        <ExerciseItem key={exercise.id} exercise={exercise} />
      ))}
    </Section>
  );
};

export default ExerciseList;
