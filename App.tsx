/**
 * Workout Journal Application
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';

import HomePage from './pages/home/HomePage';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <SafeAreaView>
        <ScrollView>
          <HomePage />
        </ScrollView>
      </SafeAreaView>
    </ApplicationProvider>
  );
};

export default App;
