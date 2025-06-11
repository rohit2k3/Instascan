import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import Header from './HomeHeader/Header';
import Carousel from './Carousel/Carousel';
import colors from '../../constant/colors';
import Camera from '../../assets/svg/Camera';
import History from './History/History';
import News from './News/News';
import { SheetManager } from 'react-native-actions-sheet';

const Home = () => {

  const handleButton = () => {
    // SheetManager.show('scan-sheet' , useSheetPayload('scan-sheet'));
    SheetManager.show('scan-sheet', {payload: {test: 'test'}});

    console.log("Scan Button Pressed");
    
  }

  return (
    <View style={Styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} >
        <Carousel />
        <History />
        <News />
      </ScrollView>
      <TouchableOpacity
        style={Styles.floatingButton}
        onPress={handleButton}>
        <Camera color="white" width={24} height={24} />
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
            marginLeft: 10,
          }}>
          Scan
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: 150,
    backgroundColor: colors.primary,
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});

export default Home;
