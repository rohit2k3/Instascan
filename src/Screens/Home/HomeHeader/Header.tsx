import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import AssetImages from '../../../assets/images/Images';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={AssetImages.appNameWithLogo} style={styles.logo} />

      {/* Custom Profile Icon */}
      <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.navigate('ProfileScreen')}>
        <Text style={styles.initial}>R</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    // backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 40,
    resizeMode: 'contain',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initial: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
