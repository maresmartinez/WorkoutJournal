import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import Section from '../../components/Section';
import {WorkoutPlan} from '../../models';

const AddWorkoutPlanForm = () => {
  const emptyRound = {
    id: 0,
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

  return (
    <Section title="Add New Workout Plan">
      <View>
        <Text style={styles.label}>Plan Name</Text>
        <TextInput
          style={styles.textInputContainer}
          value={newPlan.name}
          onChangeText={(text: string) => setNewPlan({...newPlan, name: text})}
        />
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={styles.textInputContainer}
          value={newPlan.notes}
          multiline
          onChangeText={(text: string) => setNewPlan({...newPlan, notes: text})}
        />
      </View>
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

export default AddWorkoutPlanForm;
