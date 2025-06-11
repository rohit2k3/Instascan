import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Skeleton} from './index';

export default function HisoryCardSkeleton() {
  return (
    <View style={styles.card}>
      <Skeleton width={80} height={80} style={{borderRadius: 10}} />
      <View style={{gap: 8, flex: 1}}>
        <Skeleton width={60} height={10} style={styles.text} />
        <Skeleton width={'60%'} height={10} style={styles.text} />
        <Skeleton width={60} height={10} style={styles.text} />
        <Skeleton width={'60%'} height={10} style={styles.text} />
      </View>
      <View style={{gap: 8, alignItems: 'flex-end'}}>
        <Skeleton width={90} height={10} style={styles.text} />
        <Skeleton width={60} height={10} style={styles.text} />
        <Skeleton width={90} height={10} style={styles.text} />
        <Skeleton width={60} height={10} style={styles.text} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {flexDirection: 'row', alignItems: 'center', gap: 16, margin: 16},
  text: {borderRadius: 8},
});
