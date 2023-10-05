import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
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
import defaultStyles from '../../styles/global';

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
    const db = await getDBConnection();
    const storedExercises = await exerciseTable.getAllItems(db);
    setExercises(storedExercises);
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  // TODO: Fix the select list, the parseInt isn't working righ
  const displayValue = exercises[parseInt(selectedIndex.toString(), 10)]?.name;

  return (
    <>
      <Text style={defaultStyles.mb10}>Round</Text>
      <Select
        style={defaultStyles.mb10}
        placeholder="Choose exercise"
        selectedIndex={selectedIndex}
        onSelect={index => {
          setSelectedIndex(index);
          if (index instanceof IndexPath) {
            const updatedExercise = exercises[index.row];
            const roundIndex = newPlan.rounds.findIndex(r => r.id === round.id);
            newPlan.rounds[roundIndex].exercise = updatedExercise;

            setNewPlan({...newPlan, rounds: newPlan.rounds});
          }
        }}
        value={displayValue}>
        {exercises.map(e => (
          <Layout key={e.id}>
            <SelectItem title={e.name} />
          </Layout>
        ))}
      </Select>
      <Layout style={styles.container}>
        <Input
          style={[defaultStyles.mb10, defaultStyles.mr10, styles.layout]}
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
          style={[defaultStyles.mb10, styles.layout]}
          label="Reps Per Set"
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
      </Layout>
      <Button
        style={defaultStyles.mb30}
        status="danger"
        size="small"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddWorkoutRoundItem;
