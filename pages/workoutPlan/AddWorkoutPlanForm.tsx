import React, {useState} from 'react';
import {Text, Layout, Input, Button} from '@ui-kitten/components';

import {WorkoutPlan} from '../../models';
import AddWorkoutRoundItem from './AddWorkoutRoundItem';
import defaultStyles from '../../styles/global';
import {workoutPlansTable, getDBConnection} from '../../db';

type AddWorkoutPlanFormProps = {
  setWorkoutPlans: (workoutPlan: WorkoutPlan[]) => void;
};

const AddWorkoutPlanForm = ({setWorkoutPlans}: AddWorkoutPlanFormProps) => {
  const emptyRound = {
    exercise: {id: 0, name: ''},
    sets: 1,
    repsPerSet: 1,
  };
  const emptyPlan = {
    id: 0,
    name: '',
    rounds: [],
    notes: '',
  };
  const [newPlan, setNewPlan] = useState<WorkoutPlan>(emptyPlan);

  const [highestRoundId, setHighestRoundId] = useState(1);

  const addWorkoutPlan = async () => {
    let isValid = true;

    if (!newPlan.name.trim()) {
      isValid = false;
    }

    if (!newPlan.rounds.length) {
      isValid = false;
    }

    newPlan.rounds.forEach(r => {
      if (!r.exercise.name.trim()) {
        isValid = false;
      }
    });

    if (!isValid) {
      return;
    }

    try {
      const db = await getDBConnection();

      // TODO: Actually save
      // await workoutPlansTable.saveWorkoutPlanDetailed(db, newPlan);

      setNewPlan(emptyPlan);
      const updatedPlans = await workoutPlansTable.getAllPlans(db);
      setWorkoutPlans(updatedPlans);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Text style={defaultStyles.mb10} category="h4">
        Add New Workout Plan
      </Text>
      <Input
        style={defaultStyles.mb10}
        label="Plan Name"
        value={newPlan.name}
        onChangeText={(text: string) => setNewPlan({...newPlan, name: text})}
      />
      <Input
        style={defaultStyles.mb20}
        label="Notes"
        value={newPlan.notes}
        multiline
        onChangeText={(text: string) => setNewPlan({...newPlan, notes: text})}
      />

      <Layout style={defaultStyles.mb30}>
        {newPlan.rounds.map(round => (
          <AddWorkoutRoundItem
            key={round.id}
            round={round}
            newPlan={newPlan}
            setNewPlan={setNewPlan}
          />
        ))}
        <Button
          appearance="outline"
          size="small"
          onPress={() => {
            setHighestRoundId(highestRoundId + 1);
            setNewPlan({
              ...newPlan,
              rounds: [...newPlan.rounds, {...emptyRound, id: highestRoundId}],
            });
          }}>
          Add round
        </Button>
      </Layout>

      <Button onPress={addWorkoutPlan}>Add New Plan</Button>
    </>
  );
};

export default AddWorkoutPlanForm;
