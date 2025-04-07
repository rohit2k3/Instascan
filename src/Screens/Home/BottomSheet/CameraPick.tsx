import React, {useEffect, useRef, useState} from 'react';
import {Text, StyleSheet, Image, View, TouchableOpacity} from 'react-native';

import colors from '../../../constant/colors';
import ActionSheet, {
  SheetProps,
  SheetManager,
  useSheetRef,
} from 'react-native-actions-sheet';
import AssetImages from '../../../assets/images/Images';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';


const CameraPick = (props: SheetProps<'news-sheet'>) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const ref = useSheetRef('scan-sheet');
  console.log('CameraPick Props: ', props);
  

  const handleClose = () => {
    SheetManager.hide('scan-sheet');
  };

  return (
    <ActionSheet
      gestureEnabled
      keyboardHandlerEnabled
      id={props.sheetId}
      onClose={handleClose}
      animated={true}>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          onPress={() => {
            handleClose();
            navigation.navigate('PatientFormScreen', {scanType: 'Pneumonia'});
          }}>
          <Image source={AssetImages.pneumoniaIcon} style={styles.IconStyle} />
          <Text style={styles.IconText}>Pneumonia Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleClose();
            navigation.navigate('PatientFormScreen', {scanType: 'SkinCancer'});
          }}>
          <Image source={AssetImages.skinCancerIcon} style={styles.IconStyle} />
          <Text style={styles.IconText}>Skin Cancer Scan</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'grey'},
  contentContainer: {
    // height: ,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
  },
  IconStyle: {
    height: 100,
    width: 100,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignSelf: 'center',
  },
  IconText: {
    flexDirection: 'row',
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#6366F1',
    color: '#6366F1',
    margin: 10,
  },
});

export default CameraPick;
