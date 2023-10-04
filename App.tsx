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
      <SafeAreaView>
        <ScrollView>
          <Layout
            style={[
              defaultStyles.px20,
              defaultStyles.pb20,
              defaultStyles.pt20,
              styles.titleContainer,
            ]}>
            <Text style={styles.titleFont} category="h5">
              Workout Journal
            </Text>
          </Layout>
          <Layout style={defaultStyles.px20}>
            <Divider style={defaultStyles.mb20} />
            <ExerciseList />
            <Divider style={defaultStyles.mb20} />
            <WorkoutPlansViewer />
          </Layout>
        </ScrollView>
      </SafeAreaView>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  titleContainer: {backgroundColor: '#101426'},
  titleFont: {textAlign: 'center'},
});

export default App;
