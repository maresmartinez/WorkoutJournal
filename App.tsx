/**
 * Workout Journal Application
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ExerciseList from './pages/exercise/ExerciseList';
import WorkoutPlansViewer from './pages/workoutPlan/WorkoutPlansViewer';
import AddWorkoutPlanForm from './pages/workoutPlan/AddWorkoutPlanForm';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View style={styles.appTitleContainer}>
            <Text
              style={[
                styles.appTitle,
                {
                  color: isDarkMode ? Colors.white : Colors.black,
                },
              ]}>
              Workout Journal
            </Text>
            <Text style={styles.appDescription}>Log your workouts here.</Text>
          </View>
          <ExerciseList />
          <WorkoutPlansViewer />
          <AddWorkoutPlanForm />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appTitleContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  appDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
