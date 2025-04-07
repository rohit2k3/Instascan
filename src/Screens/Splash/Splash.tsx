import {Animated, Easing, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from "react-native-toast-message"
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {getAuth , sendEmailVerification} from '@react-native-firebase/auth';
import AssetImages from '../../assets/images/Images';
export default function Splash() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity 0
  const scaleAnim = useRef(new Animated.Value(0.8)).current; // Initial scale 0.8

  useEffect(() => {
    // Start animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    // Wait 2 seconds before navigating
    setTimeout(async () => {
      const user = getAuth().currentUser;
      console.log(user);
      if (user && user.emailVerified) {
        navigation.replace("HomeScreen")
      } else {
        if(user && !user.emailVerified) {
          await sendEmailVerification(user)
          ToastAndroid.show("We again send verification email, Please verify", ToastAndroid.SHORT)
          await getAuth().signOut()
        }
        navigation.replace("OnBoardingScreen")
      }
    }, 2000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <Animated.Image
        style={{
          width: 300,
          height: 70,
          opacity: fadeAnim,
          transform: [{scale: scaleAnim}],
        }}
        source={AssetImages.appNameWithLogo}
      />
      {/* <Toast /> */}
    </View>
  );
}
