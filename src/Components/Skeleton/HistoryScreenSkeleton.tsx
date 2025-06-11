import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Skeleton} from './index';
import BackButton from '../BackButton/BackButton';
import colors from '../../constant/colors';
import HisoryCardSkeleton from './HisoryCardSkeleton';

export default function HistoryScreenSkeleton() {
  return (
    <View style={styles.container}>
        <BackButton title="Scan History" />
        {/* repeat 5 times same thing */}
        {Array.from({ length: 7 }).map((_, index) => (
            <HisoryCardSkeleton key={index} />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    // gap: 16,
    // marginTop:40
    backgroundColor: colors.screenBackground,
    height:'100%',
    width:'100%'
  },
  card: {flexDirection: 'row', alignItems: 'center', gap: 16, margin: 16},
  text: {borderRadius: 8 },
});
