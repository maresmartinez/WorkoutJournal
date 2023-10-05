import React from 'react';
import {
  Layout,
  Text,
  Divider,
  useStyleSheet,
  StyleService,
} from '@ui-kitten/components';

import ExerciseList from '../exercise/ExerciseList';
import WorkoutPlansViewer from '../workoutPlan/WorkoutPlansViewer';
import defaultStyles from '../../styles/global';

const HomePage = () => {
  const styles = useStyleSheet(themedStyles);

  return (
    <>
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
    </>
  );
};

const themedStyles = StyleService.create({
  titleContainer: {backgroundColor: 'background-basic-color-4'},
  titleFont: {textAlign: 'center'},
});

export default HomePage;
