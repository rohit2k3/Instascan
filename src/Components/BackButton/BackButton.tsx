// import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import React from 'react';
// import {NavigationProp, useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import ArrowBack from '../../assets/svg/BackArrow';


// const BackButton = ({title}:{title:string}) => {
//   const navigation = useNavigation<NativeStackNavigationProp<any>>();
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <ArrowBack width={30} height={30}/>
//       </TouchableOpacity>
//       <Text style={styles.titleText}>{title}</Text>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container:{
//     display: 'flex',
//     flexDirection: 'row',
//     width: '100%',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//   },
//     titleText: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     marginLeft: 10,
//     fontSize: 24,
//     fontWeight: 'bold',
//   }
// });


// export default BackButton;

import React, {ReactNode} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ArrowBack from '../../assets/ArrowBack';

interface BackHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
  titleCenter?: boolean;
  iconHeader?: ReactNode;
  rightElement?: ReactNode;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const BackButton = ({
  title,
  showBackButton = true,
  onBack,
  titleCenter = false,
  iconHeader,
  rightElement,
  containerStyle,
  titleStyle,
}: BackHeaderProps) => {
  const navigation = useNavigation();
  if (!onBack) onBack = () => navigation.goBack();

  return (
    <View style={[styles.mainContainer, containerStyle]}>
      {/* Back Button */}
      {showBackButton && (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowBack />
        </TouchableOpacity>
      )}

      {/* Title and Icon */}
      <View
        style={[
          styles.titleContainer,
          titleCenter && styles.centerTitleContainer,
        ]}>
        {iconHeader && <View style={styles.icon}>{iconHeader}</View>}
        <Text style={[styles.headTitle, titleStyle]}>{title}</Text>
      </View>

      {/* Right Element */}
      {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: "white",
  },
  backButton: {marginRight: 12},
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerTitleContainer: {marginLeft: -40, justifyContent: 'center'},
  icon: {marginRight: 8},
  headTitle: {fontSize: 21, fontFamily: 'Mulish-Bold', color: '#141E0D'},
  rightElement: {marginLeft: 'auto'},
});

export default BackButton;

