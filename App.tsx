/**
 * Workout Journal Application
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  Layout,
  Text,
  Divider,
} from '@ui-kitten/components';

import ExerciseList from './pages/exercise/ExerciseList';
import WorkoutPlansViewer from './pages/workoutPlan/WorkoutPlansViewer';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout style={styles.layout}>
        <SafeAreaView>
          <ScrollView>
            <Layout>
              <Text category="h1">Workout Journal</Text>
              <Text category="s1">Log your workouts here.</Text>
            </Layout>
            <Divider />
            <ExerciseList />
            <Divider />
            <WorkoutPlansViewer />
          </ScrollView>
        </SafeAreaView>
      </Layout>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingHorizontal: 20,
  },
});

export default App;
