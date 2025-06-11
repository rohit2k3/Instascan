import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';

const Test = ({title}:{title:string}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View>
      <Icon 
        name="arrow-left"
        size={20}
        onPress={() => navigation.goBack()}
      />
      <Text>{title}</Text>
    </View>
  )
}

export default Test;