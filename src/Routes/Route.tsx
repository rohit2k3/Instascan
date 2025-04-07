import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Screens/Home/Home';
import Splash from '../Screens/Splash/Splash';
import Login from '../Screens/Auth/Login/Login';
import Register from '../Screens/Auth/Register/Register';
import Onboarding from '../Screens/OnBoarding/Onboarding';
import PatientForm from '../Screens/PatientForm/PatientForm';
import Profile from '../Screens/Profile/Profile';
import HistoryScreen from '../Screens/History/HistoryScreen';
import ScanDetail from '../Screens/ScanDetails/ScanDetail';
import {SheetProvider} from 'react-native-actions-sheet';
import "../Sheet.ts"
import EditProfile from '../Screens/Profile/EditProfile.tsx';
import TermsAndCondition from '../Screens/Profile/TermsAndCondition.tsx';
import ResetPass from '../Screens/Auth/Reset/ResetPass.tsx';

const Stack = createNativeStackNavigator();

const Route = () => {
  return (
    <NavigationContainer>
      <SheetProvider>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="SplashScreen">
          <Stack.Screen name="HomeScreen" component={Home} />
          <Stack.Screen name="SplashScreen" component={Splash} />
          <Stack.Screen name="LoginScreen" component={Login} />
          <Stack.Screen name="RegisterScreen" component={Register} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPass} />
          <Stack.Screen name="OnBoardingScreen" component={Onboarding} />
          <Stack.Screen name="PatientFormScreen" component={PatientForm} />
          <Stack.Screen name="ProfileScreen" component={Profile} />
          <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
          <Stack.Screen name="ScanDetailScreen" component={ScanDetail} />
          <Stack.Screen name='EditProfileScreen' component={EditProfile} />
          <Stack.Screen name='TermsAndConditionScreen' component={TermsAndCondition} />
        </Stack.Navigator>
      </SheetProvider>
    </NavigationContainer>
  );
};

export default Route;
