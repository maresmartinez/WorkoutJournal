import React, {useState, useEffect, useCallback} from 'react';
import {Layout, Text, Divider} from '@ui-kitten/components';

import AddWorkoutPlanForm from './AddWorkoutPlanForm';
import {WorkoutPlan} from '../../models';
import defaultStyles from '../../styles/global';
import {workoutPlansTable, getDBConnection} from '../../db';
import {initialWorkoutPlans} from '../../data/initialData';

const WorkoutPlansViewer = () => {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>();

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      const storedPlans = await workoutPlansTable.getAllPlans(db);
      if (storedPlans.length) {
        setWorkoutPlans(storedPlans);
      } else {
        await workoutPlansTable.saveManyPlans(db, initialWorkoutPlans);
        setWorkoutPlans(initialWorkoutPlans);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  return (
    <>
      <Layout style={defaultStyles.mb20}>
        <Text style={defaultStyles.mb10} category="h4">
          Your Workout Plans
        </Text>
        {workoutPlans?.map(plan => (
          <Layout style={defaultStyles.mb10} key={plan.id}>
            <Text category="h6">{plan.name}</Text>
            {plan.rounds?.map(round => (
              <Layout key={round.id}>
                <Text>{`${round.exercise?.name} ${round.sets}x${round.repsPerSet}`}</Text>
              </Layout>
            ))}
          </Layout>
        ))}
      </Layout>
      <Divider style={defaultStyles.mb20} />
      <Layout style={defaultStyles.mb20}>
        <AddWorkoutPlanForm
          workoutPlans={workoutPlans}
          setWorkoutPlans={setWorkoutPlans}
        />
      </Layout>
    </>
  );
};

export default WorkoutPlansViewer;
