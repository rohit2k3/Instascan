import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native';
import {SheetProvider} from 'react-native-actions-sheet';
import Route from './src/Routes/Route';

const App = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{flex: 1}}>
        {/* <SheetProvider> */}
          <Route />
        {/* </SheetProvider> */}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
