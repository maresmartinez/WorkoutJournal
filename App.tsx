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
import defaultStyles from './styles/global';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <Layout style={styles.layout}>
        <SafeAreaView>
          <ScrollView>
            <Layout style={defaultStyles.mb20}>
              <Text category="h1">Workout Journal</Text>
              <Text category="s1">Log your workouts here.</Text>
            </Layout>
            <Divider style={defaultStyles.mb20} />
            <ExerciseList />
            <Divider style={defaultStyles.mb20} />
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
