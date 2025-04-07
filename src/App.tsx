import React from 'react';
import Route from './Routes/Route';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native';

const App = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{flex: 1}}>
          <Route />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
