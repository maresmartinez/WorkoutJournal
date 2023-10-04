import React, {useState, useCallback, useEffect} from 'react';
import {
  Text,
  Input,
  Button,
  Select,
  SelectItem,
  IndexPath,
  Layout,
} from '@ui-kitten/components';
import * as _ from 'lodash';

import {Exercise, WorkoutPlan, WorkoutRound} from '../../models';
import {getDBConnection, exerciseTable} from '../../db';
import {initialExercises} from '../../data/initialData';

type AddWorkoutRoundItemProps = {
  round: WorkoutRound;
  setNewPlan: (plan: WorkoutPlan) => void;
  newPlan: WorkoutPlan;
};

const AddWorkoutRoundItem = ({
  round,
  setNewPlan,
  newPlan,
}: AddWorkoutRoundItemProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState<
    IndexPath | IndexPath[]
  >(new IndexPath(0));

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

  const displayValue = exercises[parseInt(selectedIndex.toString(), 10)]?.name;

  return (
    <>
      <Text>Round</Text>
      <Select
        placeholder="Choose exercise"
        selectedIndex={selectedIndex}
        onSelect={index => {
          setSelectedIndex(index);

          const updatedExercise =
            exercises[parseInt(selectedIndex.toString(), 10)];

          const roundIndex = newPlan.rounds.findIndex(r => r.id === round.id);
          newPlan.rounds[roundIndex].exercise = updatedExercise;

          setNewPlan({...newPlan, rounds: newPlan.rounds});
        }}
        value={displayValue}>
        {exercises.map(e => (
          <Layout key={e.id}>
            <SelectItem title={e.name} />
          </Layout>
        ))}
      </Select>
      <Input
        label="Sets"
        keyboardType="numeric"
        value={round.sets.toString()}
        onChangeText={(text: string) => {
          var givenSet = parseInt(text, 10);
          var updatedSet = !isNaN(givenSet) ? givenSet : 0;

          const roundIndex = newPlan.rounds.findIndex(r => r.id === round.id);
          newPlan.rounds[roundIndex].sets = updatedSet;

          setNewPlan({...newPlan, rounds: newPlan.rounds});
        }}
      />
      <Input
        label="Reps per set"
        keyboardType="numeric"
        value={round.repsPerSet.toString()}
        onChangeText={(text: string) => {
          var givenReps = parseInt(text, 10);
          var updatedReps = !isNaN(givenReps) ? givenReps : 0;

          const roundIndex = newPlan.rounds.findIndex(r => r.id === round.id);
          newPlan.rounds[roundIndex].repsPerSet = updatedReps;

          setNewPlan({...newPlan, rounds: newPlan.rounds});
        }}
      />
      <Button
        status="danger"
        onPress={() => {
          const filteredRounds = _.filter(
            newPlan.rounds,
            (r: WorkoutRound) => r.id !== round.id,
          );
          setNewPlan({...newPlan, rounds: filteredRounds});
        }}>
        Remove round
      </Button>
    </>
  );
};

export default AddWorkoutRoundItem;
